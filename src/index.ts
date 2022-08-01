/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodSchema, ZodTypeDef } from '@nzod/z'

export interface NZodDto<
  TOutput = any,
  TDef extends ZodTypeDef = ZodTypeDef,
  TInput = TOutput
> {
  new (): TOutput
  isNZodDto: true
  schema: ZodSchema<TOutput, TDef, TInput>
  create(input: unknown): TOutput
}

export function createNZodDto<
  TOutput = any,
  TDef extends ZodTypeDef = ZodTypeDef,
  TInput = TOutput
>(schema: ZodSchema<TOutput, TDef, TInput>) {
  class AugmentedNZodDto {
    public static isNZodDto = true
    public static schema = schema

    public static create(input: unknown) {
      return this.schema.parse(input)
    }
  }

  return AugmentedNZodDto as unknown as NZodDto<TOutput, TDef, TInput>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNZodDto(metatype: any): metatype is NZodDto<unknown> {
  return metatype?.isNZodDto ?? false
}
