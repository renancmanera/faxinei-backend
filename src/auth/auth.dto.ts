import { z } from 'zod'

export const loginDto = z.object({
  email: z.string().email({ message: 'Formato de e-mail inválido' }),
  senha: z.string().min(1, { message: 'Senha é obrigatória' }),
})

export type LoginDto = z.infer<typeof loginDto>
