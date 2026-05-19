import { Module } from '@nestjs/common'
import { UsuarioController } from '@/usuario/usuario.controller'
import { UsuarioService } from '@/usuario/usuario.service'

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
