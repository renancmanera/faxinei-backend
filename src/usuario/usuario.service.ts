import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common'
import { hash, compare } from 'bcryptjs'
import { AtualizarUsuarioDto, CriarUsuarioDto } from '@/usuario/usuario.dto'
import { UsuarioRepository } from '@/usuario/usuario.repository'

@Injectable()
export class UsuarioService {
  constructor(private usuarioRepository: UsuarioRepository) { }

  async listar() {
    return await this.usuarioRepository.listar()
  }

  async criar(dados: CriarUsuarioDto) {
    await this.verificarEmailDisponivel(dados.email)

    const senhaCriptografada = await hash(dados.senha, 8)

    const novoUsuario = await this.usuarioRepository.criar({
      nome: dados.nome,
      email: dados.email,
      senha: senhaCriptografada,
      papel: dados.papel,
    })
    return {
      message: 'Usuário criado com sucesso!',
      id: novoUsuario.id,
      nome: dados.nome,
      email: dados.email,
      papel: novoUsuario.papel,
    }
  }

  async atualizar(id: string, dados: AtualizarUsuarioDto) {
    const usuarioExistente = await this.buscarUsuarioOuFalhar(id)

    if (dados.email) {
      await this.verificarEmailDisponivel(dados.email, id)
    }

    const dadosParaAtualizar = await this.montarDadosAtualizacao(
      dados,
      usuarioExistente,
    )

    if (Object.keys(dadosParaAtualizar).length === 0) {
      return {
        message: 'Usuário não possui modificações!',
        id,
      }
    }

    const usuarioAtualizado = await this.usuarioRepository.atualizar(
      id,
      dadosParaAtualizar,
    )
    return {
      message: 'Usuário atualizado com sucesso!',
      id: usuarioAtualizado.id,
      nome: usuarioAtualizado.nome,
      email: usuarioAtualizado.email,
    }
  }

  async remover(id: string) {
    await this.buscarUsuarioOuFalhar(id)
    await this.usuarioRepository.remover(id)
    return { message: 'Usuário removido com sucesso!' }
  }

  private async buscarUsuarioOuFalhar(id: string) {
    const usuario = await this.usuarioRepository.buscarPorId(id)
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado')
    }
    return usuario
  }

  private async verificarEmailDisponivel(email: string, idExcluir?: string) {
    const usuarioExistente = await this.usuarioRepository.buscarPorEmail(email)
    if (usuarioExistente && usuarioExistente.id !== idExcluir) {
      throw new ConflictException(
        idExcluir
          ? 'Email já está sendo utilizado por outro usuário.'
          : 'Email já cadastrado',
      )
    }
  }

  private async montarDadosAtualizacao(
    dados: AtualizarUsuarioDto,
    usuarioExistente: { nome: string; email: string; senha: string },
  ) {
    const resultado: { nome?: string; email?: string; senha?: string } = {}

    if (dados.nome !== undefined && dados.nome !== usuarioExistente.nome) {
      resultado.nome = dados.nome
    }
    if (dados.email !== undefined && dados.email !== usuarioExistente.email) {
      resultado.email = dados.email
    }
    if (dados.senha !== undefined) {
      const mesmaSenha = await compare(dados.senha, usuarioExistente.senha)
      if (!mesmaSenha) {
        resultado.senha = await hash(dados.senha, 8)
      }
    }

    return resultado
  }
}