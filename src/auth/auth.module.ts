import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { AuthService } from '@/auth/auth.service'
import { AuthController } from '@/auth/auth.controller'
import { JwtStrategy } from '@/auth/jwt.strategy'
import type { Env } from '@/config/env'
import type { StringValue } from 'ms'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService<Env, true>) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_EXPIRES_IN') as StringValue,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
