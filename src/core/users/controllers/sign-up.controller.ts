import { Body, Controller, Post, UsePipes } from '@nestjs/common';

import { ZodValidationPipe } from 'src/libs/zod/pipe/zod-validation.pipe';
import { SignUpDto, SignUpDtoSchema } from '../users.dto';
import { Public } from 'src/libs/auth/auth.type';
import { UsersService } from '../services/users-impl.service';

@Controller()
export class SignUpController {
  constructor(private readonly service: UsersService) {}

  @Post('/accounts/register')
  @Public()
  @UsePipes(new ZodValidationPipe(SignUpDtoSchema))
  async handle(@Body() data: SignUpDto) {
    console.log(data);
    await this.service.signUp(data);
  }
}
