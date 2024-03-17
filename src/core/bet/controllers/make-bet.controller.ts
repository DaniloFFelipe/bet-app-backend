import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/libs/zod/pipe/zod-validation.pipe';

import { CurrentUser } from 'src/libs/auth/current-user';
import { AuthPayload } from 'src/libs/auth/auth.type';
import { BetService } from '../services/bet.service';
import { MakeBetDto, MakeBetDtoSchema } from '../dtos/make-bet.dto';

@Controller()
export class MakeBetController {
  constructor(private readonly service: BetService) {}

  @Post('/bets/bet')
  @UsePipes(new ZodValidationPipe(MakeBetDtoSchema))
  async handle(
    @Body() data: MakeBetDto,
    @CurrentUser() { sub: userId }: AuthPayload,
  ) {
    await this.service.bet({ ...data, userId });
  }
}
