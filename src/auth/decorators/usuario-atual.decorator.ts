import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import type { UsuarioAutenticado } from '@/auth/types/usuario-autenticado'

export const UsuarioAtual = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UsuarioAutenticado => {
    const request = ctx.switchToHttp().getRequest<{ user: UsuarioAutenticado }>()
    return request.user
  },
)
