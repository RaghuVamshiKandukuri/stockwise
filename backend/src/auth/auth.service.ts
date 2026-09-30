import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
// import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        // private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    async register(dto: any) { // Replace 'any' with your RegisterDto
        // 1. Check if user exists
        // const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
        // if (existingUser) throw new BadRequestException('Email already in use');

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        // 3. Create organization and user in a transaction
        /*
        const user = await this.prisma.user.create({
        data: {
            email: dto.email,
            password: hashedPassword,
            name: dto.name,
            role: 'OWNER',
            organization: { create: { name: dto.organizationName } }
        }
        });
        */

        // 4. Return tokens
        // return this.generateTokens(user.id, user.email, user.role);
    }

    async login(dto: any) { // Replace 'any' with your LoginDto
        // 1. Find user
        // const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        // if (!user) throw new UnauthorizedException('Invalid credentials');

        // 2. Verify password
        // const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        // if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

        // 3. Return tokens
        // return this.generateTokens(user.id, user.email, user.role);
    }

    async generateTokens(userId: string, email: string, role: string) {
        const payload = { sub: userId, email, role };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '7d', // Long-lived refresh token
            }),
        ]);

        return { accessToken, refreshToken };
    }
}