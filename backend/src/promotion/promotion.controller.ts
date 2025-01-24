import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Res,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Response } from 'express';
import { GetPromotionsDto } from './dto/get-promotion.dto';

@Controller('promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post()
  async createPromotion(
    @Body() args: CreatePromotionDto,
    @Res() res: Response,
  ) {
    const result = await this.promotionService.createPromotion(args);

    return res.status(result.status).json(result);
  }

  @Get()
  async getPromotions(@Query() query: GetPromotionsDto, @Res() res: Response) {
    const result = await this.promotionService.getPromotions(query);

    return res.status(result.status).json(result);
  }

  @Get(':id')
  async getPromotion(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const result = await this.promotionService.getPromotion(id);

    return res.status(result.status).json(result);
  }

  @Patch(':id')
  async updatePromotion(
    @Param('id', ParseIntPipe) id: number,
    @Body() args: UpdatePromotionDto,
    @Res() res: Response,
  ) {
    const result = await this.promotionService.updatePromotion(id, args);

    return res.status(result.status).json(result);
  }
}
