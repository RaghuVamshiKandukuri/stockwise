import { Injectable, OnModuleInit } from '@nestjs/common';
// Importing from your custom generated path based on your schema
import { PrismaClient } from '../generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }
}