import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { CustomPrismaService, PrismaService } from 'nestjs-prisma';
import { PromotionTypes } from '@prisma/client';
import { GetPromotionsDto } from './dto/get-promotion.dto';
import { CUSTOM_PRISMA } from 'src/common/constants/prisma.const';
import { ExtendedPrismaClient } from 'src/modules/prisma/prisma.extension';
import * as moment from 'moment';

@Injectable()
export class PromotionService {
  constructor(
    private prisma: PrismaService,
    @Inject(CUSTOM_PRISMA)
    private customPrisma: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  async createPromotion(args: CreatePromotionDto) {
    const promotion = await this.prisma.promotions.create({
      select: { id: true, type: true },
      data: {
        title: args.title,
        startsAt: args.startsAt,
        endsAt: args.endsAt,
        type: args.type,
        isEnabled: true,
      },
    });

    const discounts = args.discounts.map((discount) => ({
      promotionId: promotion.id,
      ...(promotion.type === PromotionTypes.WEIGHTED && {
        minQuantity: discount.minQuantity || 0,
        maxQuantity: discount.maxQuantity,
      }),
      discount: discount.discount,
    }));

    await this.prisma.promotionDiscount.createMany({
      data: discounts,
    });

    const updatedPromotion = await this.prisma.promotions.findUnique({
      select: {
        id: true,
        title: true,
        startsAt: true,
        endsAt: true,
        type: true,
        isEnabled: true,
        promotionDiscount: {
          select: {
            id: true,
            minQuantity: true,
            maxQuantity: true,
            discount: true,
          },
        },
      },
      where: { id: promotion.id },
    });

    return {
      status: HttpStatus.OK,
      message: 'Promotion created',
      data: updatedPromotion,
    };
  }

  async getPromotions(query: GetPromotionsDto) {
    const { page = 1, perPage = 10, search, filter } = query;

    const [promotions] = await this.customPrisma.client.promotions
      .paginate({
        select: {
          id: true,
          title: true,
          startsAt: true,
          endsAt: true,
          type: true,
          isEnabled: true,
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
          title: {
            contains: search,
          },
          ...(typeof filter?.isEnabled !== 'undefined' && {
            isEnabled: filter.isEnabled,
          }),
          ...(typeof filter?.hasNotExpired !== 'undefined' &&
            filter.hasNotExpired && {
              startsAt: { lte: moment().toDate() },
              endsAt: { gte: moment().toDate() },
            }),
        },
      })
      .withPages({
        limit: perPage,
        page,
        includePageCount: true,
      });

    return {
      status: HttpStatus.OK,
      message: 'Promotions found',
      data: { items: promotions },
    };
  }

  async getPromotion(id: number) {
    const promotion = await this.prisma.promotions.findUnique({
      select: {
        id: true,
        title: true,
        startsAt: true,
        endsAt: true,
        type: true,
        isEnabled: true,
        promotionDiscount: {
          select: {
            id: true,
            minQuantity: true,
            maxQuantity: true,
            discount: true,
          },
        },
      },
      where: { id },
    });

    if (!promotion) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Promotion not found',
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Promotion found',
      data: promotion,
    };
  }

  async updatePromotion(id: number, args: UpdatePromotionDto) {
    const promotion = await this.prisma.promotions.findUnique({
      select: { id: true, type: true },
      where: { id },
    });

    if (!promotion) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Promotion not found',
      };
    }

    const updatedPromotion = await this.prisma.promotions.update({
      where: { id },
      data: { ...args },
    });

    return {
      status: HttpStatus.OK,
      message: 'Promotion updated',
      data: updatedPromotion,
    };
  }
}
