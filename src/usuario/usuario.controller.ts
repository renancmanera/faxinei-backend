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
  ForbiddenException,
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
import { RoleGuard } from '@/auth/guards/role.guard'
import { UsuarioAtual } from '@/auth/decorators/usuario-atual.decorator'
import type { UsuarioAutenticado } from '@/auth/types/usuario-autenticado'

@Controller('api/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Get('listar')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async listar() {
    return await this.usuarioService.listar()
  }

  @Post('criar')
  @HttpCode(201)
  async criar(
    @Body(new ZodValidationPipe(criarUsuarioDto)) body: CriarUsuarioDto,
  ) {
    return await this.usuarioService.criar(body)
  }

  @Put('atualizar/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async atualizar(
    @Param('id') id: string,
    @UsuarioAtual() user: UsuarioAutenticado,
    @Body(new ZodValidationPipe(atualizarUsuarioDto))
    body: AtualizarUsuarioDto,
  ) {
    if (user.idUsuario !== id) {
      throw new ForbiddenException('Você só pode atualizar seu próprio perfil')
    }
    return await this.usuarioService.atualizar(id, body)
  }

  @Delete('remover/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async remover(
    @Param('id') id: string,
    @UsuarioAtual() user: UsuarioAutenticado,
  ) {
    if (user.idUsuario !== id) {
      throw new ForbiddenException('Você só pode remover seu próprio perfil')
    }
    return await this.usuarioService.remover(id)
  }
}
