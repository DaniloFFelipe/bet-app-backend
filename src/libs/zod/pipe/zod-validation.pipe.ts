import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(
    private schema: ZodSchema,
    private where: string = 'body',
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: unknown, meta: ArgumentMetadata) {
    if (meta.type !== this.where) return value;

    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(error.errors);
      }
      throw new InternalServerErrorException();
    }
  }
}

export function zodValidation() {}
