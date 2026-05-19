import { SetMetadata } from '@nestjs/common'
import type { RoleUsuario } from '@/auth/types/usuario-autenticado'

export const ROLES_KEY = 'roles'
export const Role = (...roles: RoleUsuario[]) => SetMetadata(ROLES_KEY, roles)
