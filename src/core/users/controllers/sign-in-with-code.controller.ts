import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';

import { ZodValidationPipe } from 'src/libs/zod/pipe/zod-validation.pipe';
import { SignInWithCodeDto, SignInWithCodeDtoSchema } from '../users.dto';
import { Public } from 'src/libs/auth/auth.type';
import { UsersService } from '../services/users-impl.service';

@Controller('sessions/auth/code')
export class SignInWithCodeController {
  constructor(private readonly service: UsersService) {}

  @Post('/')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(SignInWithCodeDtoSchema))
  async handle(@Body() data: SignInWithCodeDto) {
    return await this.service.signInWithCode(data);
  }
}
