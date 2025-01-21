import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryParamDto } from 'src/common/dto/query-param.dto';
import { CustomPrismaService, PrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/modules/prisma/prisma.extension';
import { CUSTOM_PRISMA } from 'src/common/constants/prisma.const';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    @Inject(CUSTOM_PRISMA)
    private customPrisma: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  async createProduct(args: CreateProductDto) {
    const product = await this.prisma.products.create({
      data: {
        name: args.name,
        description: args.description,
        price: args.price,
        weight: args.weight,
        isEnabled: true,
      },
    });

    return {
      status: HttpStatus.OK,
      message: 'Product created',
      data: product,
    };
  }

  async getProducts(query: QueryParamDto) {
    const { page = 1, perPage = 10, search } = query;

    const [products, meta] = await this.customPrisma.client.products
      .paginate({
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          weight: true,
          isEnabled: true,
        },
        where: {
          name: {
            contains: search,
          },
        },
      })
      .withPages({
        limit: perPage,
        page,
      });

    return {
      status: HttpStatus.OK,
      message: 'Products found',
      data: { items: products, meta },
    };
  }

  async getProduct(id: number) {
    const product = await this.prisma.products.findUnique({
      where: { id },
    });

    if (!product) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Product not found',
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Product found',
      data: product,
    };
  }

  async updateProduct(id: number, args: UpdateProductDto) {
    const product = await this.prisma.products.findUnique({
      where: { id },
    });

    if (!product) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Product not found',
      };
    }

    const updatedProduct = await this.prisma.products.update({
      where: { id },
      data: { ...args },
    });

    return {
      status: HttpStatus.OK,
      message: 'Product updated',
      data: updatedProduct,
    };
  }
}
