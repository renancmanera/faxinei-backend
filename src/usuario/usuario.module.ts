import { Module } from '@nestjs/common'
import { AuthModule } from '@/auth/auth.module'
import { UsuarioController } from '@/usuario/usuario.controller'
import { UsuarioService } from '@/usuario/usuario.service'

@Module({
  imports: [AuthModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
