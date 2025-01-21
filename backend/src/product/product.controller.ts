import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryParamDto } from 'src/common/dto/query-param.dto';
import { Response } from 'express';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() args: CreateProductDto, @Res() res: Response) {
    const result = await this.productService.createProduct(args);

    return res.status(result.status).json(result);
  }

  @Get()
  async getProducts(@Query() query: QueryParamDto, @Res() res: Response) {
    const result = await this.productService.getProducts(query);

    return res.status(result.status).json(result);
  }

  @Get(':id')
  async getProduct(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const result = await this.productService.getProduct(id);

    return res.status(result.status).json(result);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() args: UpdateProductDto,
    @Res() res: Response,
  ) {
    const result = await this.productService.updateProduct(id, args);

    return res.status(result.status).json(result);
  }
}
