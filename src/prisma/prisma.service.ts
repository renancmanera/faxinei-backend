import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import type { Env } from '@/config/env'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(config: ConfigService<Env, true>) {
    const databaseURL = new URL(config.get('DATABASE_URL'))
    const schema = databaseURL.searchParams.get('schema')

    const adapter = new PrismaPg(
      { connectionString: databaseURL.toString() },
      { schema: schema || 'public' },
    )

    super({
      adapter,
      log: ['warn', 'error'],
    })
  }

  onModuleInit() {
    return this.$connect()
  }

  onModuleDestroy() {
    return this.$disconnect()
  }
}
