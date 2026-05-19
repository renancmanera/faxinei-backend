import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '@/auth/decorators/role.decorator'
import type {
  UsuarioAutenticado,
  RoleUsuario,
} from '@/auth/types/usuario-autenticado'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<RoleUsuario[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!roles?.length) {
      return true
    }

    const request = context
      .switchToHttp()
      .getRequest<{ user?: UsuarioAutenticado }>()
    const user = request.user

    if (!user?.role) {
      throw new ForbiddenException('Acesso negado')
    }

    if (!roles.includes(user.role)) {
      throw new ForbiddenException('Você não tem permissão para esta ação')
    }

    return true
  }
}
