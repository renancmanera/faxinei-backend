import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from '@/app.module'
import { GlobalExceptionFilter } from '@/filters/global-exception.filter'
import type { Env } from '@/config/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService<Env, true>)

  app.useGlobalFilters(new GlobalExceptionFilter())
  await app.listen(config.get('PORT'))
}
bootstrap()
