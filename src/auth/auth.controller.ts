import { Controller, Post, Body, HttpCode } from '@nestjs/common'
import { AuthService } from '@/auth/auth.service'
import { loginDto, LoginDto } from '@/auth/auth.dto'
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe'

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body(new ZodValidationPipe(loginDto)) body: LoginDto,
  ) {
    return this.authService.login(body)
  }
}
