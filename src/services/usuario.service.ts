import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service' // Ajuste o path conforme seu projeto
import { hash } from 'bcryptjs'

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async listar() {
    const usuarios = await this.prisma.usuario.findMany({
      omit: {
        senha: true,
      },
    })
    return usuarios
  }

  async criar(body: any) {
    const { nome, email, senha } = body

    const usuarioExistente = await this.prisma.usuario.findUnique({
      where: { email },
    })
    if (usuarioExistente) {
      throw new ConflictException('Email já cadastrado')
    }

    const senhaCriptografada = await hash(senha, 8)

    const novoUsuario = await this.prisma.usuario.create({
      data: { nome, email, senha: senhaCriptografada },
    })
    return {
      message: 'Usuário criado com sucesso!',
      id: novoUsuario.id,
      nome,
      email,
    }
  }

  async atualizar(id: string, body: any) {
    try {
      const { nome, email, senha } = body
      const userId = id

      const usuarioMesmoEmail = await this.prisma.usuario.findUnique({
        where: { email },
      })

      if (usuarioMesmoEmail && usuarioMesmoEmail.id !== userId) {
        throw new ConflictException(
          'Email já está sendo utilizado por outro usuário.',
        )
      }

      if (
        usuarioMesmoEmail?.nome === nome &&
        usuarioMesmoEmail?.senha === senha
      )
        return {
          message: 'Usuário não possui modificações!',
          id: userId,
        }

      const senhaCriptografada = await hash(senha, 8)

      const usuarioAtualizado = await this.prisma.usuario.update({
        where: { id: userId },
        data: { nome, email, senha: senhaCriptografada },
      })
      return {
        message: 'Usuário atualizado com sucesso!',
        id: usuarioAtualizado.id,
        nome,
        email,
      }
    } catch (error) {
      throw error
    }
  }

  async remover(id: string) {
    try {
      const usuarioExistente = await this.prisma.usuario.findUnique({
        where: { id },
      })
      if (!usuarioExistente) {
        throw new NotFoundException('Usuário não encontrado')
      }
      await this.prisma.usuario.delete({
        where: { id },
      })
      return { message: 'Usuário removido com sucesso!' }
    } catch (error) {
      throw error
    }
  }
}
