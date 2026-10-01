import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        // 1. Initialize the native Postgres connection pool
        const connectionString = process.env.DATABASE_URL;
        const pool = new Pool({ connectionString });

        // 2. Wrap the pool in Prisma's adapter
        const adapter = new PrismaPg(pool);

        // 3. Pass the adapter to the underlying PrismaClient
        super({ adapter });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}