import { z } from 'zod'

export const loginUsuarioDto = z.object({
  email: z.string().email({ message: 'Formato de e-mail inválido' }),
  senha: z.string().min(1, { message: 'Senha é obrigatória' }),
})

export type LoginUsuarioDto = z.infer<typeof loginUsuarioDto>
