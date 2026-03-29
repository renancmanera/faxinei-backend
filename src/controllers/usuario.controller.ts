import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  Put,
  Delete,
  BadRequestException,
} from '@nestjs/common'
import { UsuarioService } from '@/services/usuario.service'
import { criarUsuarioDto, atualizarUsuarioDto } from '@/dto/usuario.dto'
import { z } from 'zod'

@Controller('api/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Get('listar')
  @HttpCode(200)
  async listar() {
    return await this.usuarioService.listar()
  }

  @Post('criar')
  @HttpCode(201)
  async criar(@Body() body: unknown) {
    const bodyValidado = criarUsuarioDto.safeParse(body)
    if (!bodyValidado.success) {
      const camposInvalidos = z.flattenError(bodyValidado.error).fieldErrors
      throw new BadRequestException({
        message: 'Dados inválidos',
        errors: {
          nome: camposInvalidos.nome?.[0],
          email: camposInvalidos.email?.[0],
          senha: camposInvalidos.senha?.[0],
        },
      })
    }
    return await this.usuarioService.criar(bodyValidado.data)
  }

  @Put('atualizar/:id')
  @HttpCode(200)
  async atualizar(@Body() body: unknown, @Param('id') id: string) {
    const bodyValidado = atualizarUsuarioDto.safeParse(body)
    if (!bodyValidado.success) {
      const camposInvalidos = z.flattenError(bodyValidado.error).fieldErrors
      throw new BadRequestException({
        message: 'Dados inválidos',
        errors: {
          nome: camposInvalidos.nome?.[0],
          email: camposInvalidos.email?.[0],
          senha: camposInvalidos.senha?.[0],
        },
      })
    }
    return await this.usuarioService.atualizar(id, bodyValidado.data)
  }

  @Delete('remover/:id')
  @HttpCode(200)
  async remover(@Param('id') id: string) {
    return await this.usuarioService.remover(id)
  }
}
