import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UsuarioService } from '@/usuario/usuario.service'
import {
  criarUsuarioDto,
  atualizarUsuarioDto,
  CriarUsuarioDto,
  AtualizarUsuarioDto,
} from '@/usuario/usuario.dto'
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe'

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
  @UseGuards(AuthGuard('jwt'))
  async criar(
    @Body(new ZodValidationPipe(criarUsuarioDto)) body: CriarUsuarioDto,
  ) {
    return await this.usuarioService.criar(body)
  }

  @Put('atualizar/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  async atualizar(
    @Body(new ZodValidationPipe(atualizarUsuarioDto))
    body: AtualizarUsuarioDto,
    @Param('id') id: string,
  ) {
    return await this.usuarioService.atualizar(id, body)
  }

  @Delete('remover/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  async remover(@Param('id') id: string) {
    return await this.usuarioService.remover(id)
  }
}
