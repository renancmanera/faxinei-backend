import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service' // Ajuste o path conforme seu projeto
import { hash } from 'bcryptjs'
import { AtualizarUsuarioDto, CriarUsuarioDto } from '@/dto/usuario.dto'

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async listar() {
    try {
      const usuarios = await this.prisma.usuario.findMany({
        omit: {
          senha: true,
        },
      })
      return usuarios
    } catch (error) {
      throw new InternalServerErrorException('Erro ao listar usuários')
    }
  }

  async criar(body: CriarUsuarioDto) {
    try {
      const usuarioExistente = await this.prisma.usuario.findUnique({
        where: { email: body.email },
      })
      if (usuarioExistente) {
        throw new ConflictException('Email já cadastrado')
      }

      const senhaCriptografada = await hash(body.senha, 8)

      const novoUsuario = await this.prisma.usuario.create({
        data: { nome: body.nome, email: body.email, senha: senhaCriptografada },
      })
      return {
        message: 'Usuário criado com sucesso!',
        id: novoUsuario.id,
        nome: body.nome,
        email: body.email,
      }
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar usuário')
    }
  }

  async atualizar(id: string, body: AtualizarUsuarioDto) {
    try {
      const usuarioExistente = await this.prisma.usuario.findUnique({
        where: { id },
      })
      if (!usuarioExistente) {
        throw new NotFoundException('Usuário não encontrado')
      }

      if (body.email) {
        const usuarioMesmoEmail = await this.prisma.usuario.findUnique({
          where: { email: body.email },
        })
        if (usuarioMesmoEmail && usuarioMesmoEmail.id !== id) {
          throw new ConflictException(
            'Email já está sendo utilizado por outro usuário.',
          )
        }
      }

      const dadosParaAtualizar: {
        nome?: string
        email?: string
        senha?: string
      } = {}
      if (body.nome !== undefined) dadosParaAtualizar.nome = body.nome
      if (body.email !== undefined) dadosParaAtualizar.email = body.email
      if (body.senha !== undefined)
        dadosParaAtualizar.senha = await hash(body.senha, 8)

      const semMudancas =
        (dadosParaAtualizar.nome === undefined ||
          dadosParaAtualizar.nome === usuarioExistente.nome) &&
        (dadosParaAtualizar.email === undefined ||
          dadosParaAtualizar.email === usuarioExistente.email) &&
        dadosParaAtualizar.senha === undefined
      if (semMudancas) {
        return {
          message: 'Usuário não possui modificações!',
          id,
        }
      }
      const usuarioAtualizado = await this.prisma.usuario.update({
        where: { id },
        data: dadosParaAtualizar,
      })
      return {
        message: 'Usuário atualizado com sucesso!',
        id: usuarioAtualizado.id,
        nome: usuarioAtualizado.nome,
        email: usuarioAtualizado.email,
      }
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar usuário')
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
      throw new InternalServerErrorException('Erro ao remover usuário')
    }
  }
}
