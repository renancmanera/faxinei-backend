import { Module } from '@nestjs/common'
import { AuthModule } from '@/auth/auth.module'
import { UsuarioController } from '@/usuario/usuario.controller'
import { UsuarioService } from '@/usuario/usuario.service'
import { UsuarioRepository } from '@/usuario/usuario.repository'

@Module({
  imports: [AuthModule],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepository],
})
export class UsuarioModule {}
