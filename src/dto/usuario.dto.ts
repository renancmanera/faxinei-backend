import { z } from 'zod'

export const criarUsuarioDto = z.object({
  nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Formato de e-mail inválido'),
  senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

export const atualizarUsuarioDto = z
  .object({
    nome: z.string().min(3).optional(),
    email: z.string().email().optional(),
    senha: z.string().min(6).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Informe ao menos um campo para atualização.',
  })

export type CriarUsuarioDto = z.infer<typeof criarUsuarioDto>
export type AtualizarUsuarioDto = z.infer<typeof atualizarUsuarioDto>
