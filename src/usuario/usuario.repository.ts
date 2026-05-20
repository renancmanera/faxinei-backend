import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import type { PapelUsuario } from '@/auth/types/usuario-autenticado'

@Injectable()
export class UsuarioRepository {
    constructor(private prisma: PrismaService) { }

    async listar() {
        return await this.prisma.usuario.findMany({
            omit: {
                senha: true,
            },
        })
    }

    async buscarPorEmail(email: string) {
        return await this.prisma.usuario.findUnique({
            where: { email },
        })
    }

    async buscarPorId(id: string) {
        return await this.prisma.usuario.findUnique({
            where: { id },
        })
    }

    async criar(data: {
        nome: string
        email: string
        senha: string
        papel: PapelUsuario
    }) {
        return await this.prisma.usuario.create({
            data,
        })
    }

    async atualizar(id: string, data: Record<string, unknown>) {
        return await this.prisma.usuario.update({
            where: { id },
            data,
        })
    }

    async remover(id: string) {
        return await this.prisma.usuario.delete({
            where: { id },
        })
    }
}