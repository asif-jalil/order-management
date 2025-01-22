import { Module } from '@nestjs/common';
import { AuthModule } from './apps/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './modules/shared.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from './guards';
import { RedisModule } from './modules/redis/redis.module';
import { ProductModule } from './product/product.module';
import { PromotionModule } from './promotion/promotion.module';
import { CustomPrismaModule } from 'nestjs-prisma';
import { CUSTOM_PRISMA } from './common/constants/prisma.const';
import { ExtendedPrismaConfigService } from './modules/prisma/extended-prisma.service';
import { PrismaModule } from 'nestjs-prisma';
import { OrderModule } from './order/order.module';
import { ValidateIncomingInput } from './pipes/validate-incoming-input.pipe';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CustomPrismaModule.forRootAsync({
      isGlobal: true,
      name: CUSTOM_PRISMA,
      useClass: ExtendedPrismaConfigService,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    SharedModule,
    RedisModule,
    ProductModule,
    PromotionModule,
    OrderModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidateIncomingInput,
    },
  ],
})
export class AppModule {}
