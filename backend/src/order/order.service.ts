import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { CustomPrismaService, PrismaService } from 'nestjs-prisma';
import * as moment from 'moment';
import { PromotionDiscount } from '@prisma/client';
import { QueryParamDto } from 'src/common/dto/query-param.dto';
import { CUSTOM_PRISMA } from 'src/common/constants/prisma.const';
import { ExtendedPrismaClient } from 'src/modules/prisma/prisma.extension';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    @Inject(CUSTOM_PRISMA)
    private customPrisma: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  async createOrder(args: CreateOrderDto) {
    const productIds = args.orderItems.map((item) => item.productId);
    const products = await this.prisma.products.findMany({
      select: { id: true, price: true, weight: true },
      where: { id: { in: productIds }, isEnabled: true },
    });
    const availableProductIds = products.map((product) => product.id);
    const isValidProducts = productIds.every((id) =>
      availableProductIds.includes(id),
    );

    if (!isValidProducts) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'All product is not available',
      };
    }

    let promotion = null;
    if (args.promotionId) {
      promotion = await this.prisma.promotions.findUnique({
        select: {
          type: true,
          promotionDiscount: {
            select: {
              id: true,
              minQuantity: true,
              maxQuantity: true,
              discount: true,
            },
          },
        },
        where: {
          id: args.promotionId,
          isEnabled: true,
          startsAt: { lte: moment().toDate() },
          endsAt: { gte: moment().toDate() },
        },
      });

      if (!promotion) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Promotion is expired or inactive',
        };
      }
    }

    const orderItems = args.orderItems.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      const basePrice = product.price * item.quantity;
      let discount = 0;

      if (promotion && promotion.type === 'PERCENTAGE') {
        discount = (basePrice * promotion.promotionDiscount[0].discount) / 100;
      }

      if (promotion && promotion.type === 'FIXED') {
        discount = promotion.promotionDiscount[0].discount;
      }

      if (promotion && promotion.type === 'WEIGHTED') {
        const totalWeight = product.weight * item.quantity;
        const slab = promotion.promotionDiscount.find(
          (s: Partial<PromotionDiscount>): boolean =>
            totalWeight >= (s.minQuantity || 0) &&
            (s.maxQuantity === null || totalWeight <= s.maxQuantity),
        );

        if (slab) {
          discount = (slab.discount * totalWeight) / product.weight;
        }
      }

      return {
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: product.price,
        discount,
      };
    });

    const subtotal = orderItems.reduce(
      (prev, curr) => prev + curr.quantity * curr.unitPrice,
      0,
    );

    const discount = orderItems.reduce((prev, curr) => prev + curr.discount, 0);

    const order = await this.prisma.orders.create({
      select: {
        id: true,
        shippingAddress: true,
        subtotal: true,
        discount: true,
      },
      data: {
        shippingAddress: args.shippingAddress,
        subtotal,
        discount,
      },
    });

    await this.prisma.orderItems.createMany({
      data: orderItems.map((item) => ({
        orderId: order.id,
        ...item,
      })),
    });

    return {
      status: HttpStatus.OK,
      message: 'Order created successfully',
      data: { ...order, orderItems },
    };
  }

  async getOrders(query: QueryParamDto) {
    const { page = 1, perPage = 10 } = query;

    const [orders, meta] = await this.customPrisma.client.orders
      .paginate({
        select: {
          id: true,
          shippingAddress: true,
          subtotal: true,
          discount: true,
          createdAt: true,
          orderItems: {
            select: {
              id: true,
              quantity: true,
              unitPrice: true,
              discount: true,
              product: {
                select: { id: true, name: true },
              },
            },
          },
        },
      })
      .withPages({
        limit: perPage,
        page,
        includePageCount: true,
      });

    return {
      status: HttpStatus.OK,
      message: 'Products found',
      data: { items: orders, meta },
    };
  }

  async getOrder(id: number) {
    const order = await this.prisma.orders.findUnique({
      select: {
        id: true,
        shippingAddress: true,
        subtotal: true,
        discount: true,
        createdAt: true,
        orderItems: {
          select: {
            quantity: true,
            unitPrice: true,
            discount: true,
            product: {
              select: { id: true, name: true },
            },
          },
        },
      },
      where: { id },
    });

    if (!order) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Order not found',
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Order found',
      data: order,
    };
  }
}
