import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { UsuarioController } from './controllers/usuario.controller'
import { UsuarioService } from './services/usuario.service'

@Module({
  imports: [],
  controllers: [UsuarioController],
  providers: [PrismaService, UsuarioService],
})
export class AppModule {}
