import { SetMetadata } from '@nestjs/common'
import type { PapelUsuario } from '@/auth/types/usuario-autenticado'

export const PAPEIS_KEY = 'papeis'
export const Papel = (...papeis: PapelUsuario[]) => SetMetadata(PAPEIS_KEY, papeis)
