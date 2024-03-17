import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/libs/zod/pipe/zod-validation.pipe';

import { CurrentUser } from 'src/libs/auth/current-user';
import { AuthPayload } from 'src/libs/auth/auth.type';
import { BetService } from '../services/bet.service';
import { CreateBetDto, CreateBetDtoSchema } from '../dtos/create-bet.dto';

@Controller()
export class CreateBetController {
  constructor(private readonly service: BetService) {}

  @Post('/bets')
  @UsePipes(new ZodValidationPipe(CreateBetDtoSchema))
  async handle(
    @Body() data: CreateBetDto,
    @CurrentUser() { sub: userId }: AuthPayload,
  ) {
    await this.service.create({ ...data, userId });
  }
}
