import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Response } from 'express';
import { QueryParamDto } from 'src/common/dto/query-param.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() args: CreateOrderDto, @Res() res: Response) {
    const result = await this.orderService.createOrder(args);

    return res.status(result.status).json(result);
  }

  @Get()
  async getOrders(@Query() query: QueryParamDto, @Res() res: Response) {
    const result = await this.orderService.getOrders(query);

    return res.status(result.status).json(result);
  }

  @Get(':id')
  async getOrder(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const result = await this.orderService.getOrder(id);

    return res.status(result.status).json(result);
  }
}
