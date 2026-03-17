import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  ConflictException,
  Patch,
  Put,
  Delete,
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UsuarioService } from '@/services/usuario.service'

@Controller('api/usuarios')
export class UsuarioController {
  constructor(
    private prisma: PrismaService,
    private usuarioService: UsuarioService,
  ) {}

  @Get('listar')
  @HttpCode(200)
  async listar() {
    return await this.usuarioService.listar()
  }

  @Post('criar')
  @HttpCode(201)
  async criar(@Body() body: any) {
    return await this.usuarioService.criar(body)
  }

  @Put('atualizar/:id')
  @HttpCode(200)
  async atualizar(@Body() body: any, @Param('id') id: string) {
    return await this.usuarioService.atualizar(id, body)
  }

  @Delete('remover/:id')
  @HttpCode(200)
  async remover(@Param('id') id: string) {
    return await this.usuarioService.remover(id)
  }
}
