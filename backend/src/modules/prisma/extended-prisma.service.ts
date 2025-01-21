import { Injectable } from '@nestjs/common';
import { CustomPrismaClientFactory } from 'nestjs-prisma';
import { extendedPrismaClient, ExtendedPrismaClient } from './prisma.extension';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExtendedPrismaConfigService
  implements CustomPrismaClientFactory<ExtendedPrismaClient>
{
  constructor(private config: ConfigService) {}

  createPrismaClient(): ExtendedPrismaClient {
    // you could pass options to your `PrismaClient` instance here
    return extendedPrismaClient;
  }
}
