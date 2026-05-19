export type RoleUsuario = 'CLIENTE' | 'DIARISTA'

export type UsuarioAutenticado = {
  idUsuario: string
  email: string
  role: RoleUsuario
}

export type JwtPayload = {
  sub: string
  email: string
  role: RoleUsuario
}
