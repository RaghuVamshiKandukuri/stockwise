import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() dto: any) { // Use RegisterDto
        return this.authService.register(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() dto: any) { // Use LoginDto
        return this.authService.login(dto);
    }

    @Post('refresh')
    async refreshToken(@Body('token') token: string) {
        // Implement token verification and issue new access token
    }
}