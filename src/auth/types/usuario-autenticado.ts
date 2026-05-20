export type PapelUsuario = 'CLIENTE' | 'DIARISTA'

export type UsuarioAutenticado = {
  idUsuario: string
  email: string
  papel: PapelUsuario
}

export type JwtPayload = {
  sub: string
  email: string
  papel: PapelUsuario
}
