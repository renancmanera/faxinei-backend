import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  ConflictException,
} from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'

@Controller('api/usuarios')
export class CriarUsuarioController {
  constructor(private prisma: PrismaService) {}

  @Get('listar')
  @HttpCode(200)
  async listar() {
    try {
      const usuarios = await this.prisma.usuario.findMany()
      return usuarios
    } catch (error) {
      console.error('Erro ao listar usuários:', error)
      throw error
    }
  }

  @Post('criar')
  @HttpCode(201)
  async criar(@Body() body: any) {
    try {
      const { nome, email, senha } = body

      const usuarioExistente = await this.prisma.usuario.findUnique({
        where: { email },
      })

      if (usuarioExistente) {
        throw new ConflictException('Email já cadastrado')
      }

      const novoUsuario = await this.prisma.usuario.create({
        data: { nome, email, senha },
      })
      return { message: 'Usuário criado com sucesso!', id: novoUsuario.id }
    } catch (error) {
      console.error('ERRO NO PRISMA:', error)
      throw error
    }
  }
}
