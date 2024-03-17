import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';

import { ZodValidationPipe } from 'src/libs/zod/pipe/zod-validation.pipe';
import {
  SignInWithPasswordDto,
  SignInWithPasswordDtoSchema,
} from '../users.dto';
import { Public } from 'src/libs/auth/auth.type';
import { UsersService } from '../services/users-impl.service';

@Controller('sessions/auth/password')
export class SignInWithPasswordController {
  constructor(private readonly service: UsersService) {}

  @Post('/')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(SignInWithPasswordDtoSchema))
  async handle(@Body() data: SignInWithPasswordDto) {
    return await this.service.signInWithPassword(data);
  }
}
