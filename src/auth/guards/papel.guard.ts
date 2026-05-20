import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { PAPEIS_KEY } from '@/auth/decorators/papel.decorator'
import type {
  UsuarioAutenticado,
  PapelUsuario,
} from '@/auth/types/usuario-autenticado'

@Injectable()
export class PapelGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const papeis = this.reflector.getAllAndOverride<PapelUsuario[]>(PAPEIS_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!papeis?.length) {
      return true
    }

    const request = context
      .switchToHttp()
      .getRequest<{ usuario?: UsuarioAutenticado }>()
    const usuario = request.usuario

    if (!usuario?.papel) {
      throw new ForbiddenException('Acesso negado')
    }

    if (!papeis.includes(usuario.papel)) {
      throw new ForbiddenException('Você não tem permissão para esta ação')
    }

    return true
  }
}
