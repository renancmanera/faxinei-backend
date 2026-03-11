import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CriarUsuarioController } from './controllers/usuario.controller'

@Module({
  imports: [],
  controllers: [CriarUsuarioController],
  providers: [PrismaService],
})
export class AppModule {}
