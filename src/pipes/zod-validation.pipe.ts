import { PipeTransform, BadRequestException } from '@nestjs/common'
import { ZodSchema, z } from 'zod'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value)
    if (!result.success) {
      const campos = z.flattenError(result.error).fieldErrors
      const errors: Record<string, string | undefined> = {}
      for (const [key, messages] of Object.entries(campos)) {
        errors[key] = messages?.[0]
      }
      throw new BadRequestException({
        message: 'Dados inválidos',
        errors,
      })
    }
    return result.data
  }
}
