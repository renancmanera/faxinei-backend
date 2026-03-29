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
    const bodyValidado = criarUsuarioDto.parse(body)
    return await this.usuarioService.criar(bodyValidado)
  }

  @Put('atualizar/:id')
  @HttpCode(200)
  async atualizar(@Body() body: unknown, @Param('id') id: string) {
    const bodyValidado = atualizarUsuarioDto.parse(body)
    return await this.usuarioService.atualizar(id, bodyValidado)
  }

  @Delete('remover/:id')
  @HttpCode(200)
  async remover(@Param('id') id: string) {
    return await this.usuarioService.remover(id)
  }
}
