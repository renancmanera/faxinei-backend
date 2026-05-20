import { Controller, Post, Body, HttpCode } from '@nestjs/common'
import { AuthService } from '@/auth/auth.service'
import { loginUsuarioDto, LoginUsuarioDto } from '@/auth/auth.dto'
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe'

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @HttpCode(200)
  async login(@Body(new ZodValidationPipe(loginUsuarioDto)) body: LoginUsuarioDto) {
    return this.authService.login(body)
  }
}
