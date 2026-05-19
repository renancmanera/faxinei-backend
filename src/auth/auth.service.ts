import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { PrismaService } from '@/prisma/prisma.service'
import type { LoginDto } from '@/auth/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(dados: LoginDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email: dados.email },
      select: {
        id: true,
        email: true,
        nome: true,
        senha: true,
      },
    })

    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas')
    }

    const senhaOk = await compare(dados.senha, usuario.senha)

    if (!senhaOk) {
      throw new UnauthorizedException('Credenciais inválidas')
    }

    const payload = { sub: usuario.id, email: usuario.email }

    return {
      access_token: await this.jwtService.signAsync(payload),
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    }
  }
}
