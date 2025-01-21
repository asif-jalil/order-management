import { PromotionTypes } from '@prisma/client';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class DiscountDto {
  @IsOptional()
  @IsInt()
  minQuantity: number;

  @IsOptional()
  @IsInt()
  maxQuantity: number;

  @IsNotEmpty()
  @IsNumber()
  discount: number;
}

export class CreatePromotionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  startsAt: string;

  @IsNotEmpty()
  @IsString()
  endsAt: string;

  @IsNotEmpty()
  @IsEnum(PromotionTypes)
  type: PromotionTypes;

  @ValidateNested({ each: true })
  @Type(() => DiscountDto)
  @IsArray()
  @ArrayNotEmpty()
  discounts: DiscountDto[];
}
