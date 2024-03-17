import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/libs/zod/pipe/zod-validation.pipe';

import { CurrentUser } from 'src/libs/auth/current-user';
import { AuthPayload } from 'src/libs/auth/auth.type';
import { BetService } from '../services/bet.service';

import { EndsBetDto, EndsBetDtoSchema } from '../dtos/ends-bet.dto';

@Controller()
export class EndBetController {
  constructor(private readonly service: BetService) {}

  @Post('/bets/end')
  @UsePipes(new ZodValidationPipe(EndsBetDtoSchema))
  async handle(
    @Body() data: EndsBetDto,
    @CurrentUser() { sub: userId }: AuthPayload,
  ) {
    await this.service.ends({ ...data, userId });
  }
}
