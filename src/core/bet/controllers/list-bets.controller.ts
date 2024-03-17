import { Controller, Get, Query } from '@nestjs/common';
import { CurrentUser } from 'src/libs/auth/current-user';
import { AuthPayload } from 'src/libs/auth/auth.type';
import {
  WithPaginationRequest,
  validatePagination,
} from 'src/libs/dtos/pagination';
import { BetService } from '../services/bet.service';
import { ListBetDto } from '../dtos/list-bet.dto';

@Controller()
export class ListBetsController {
  constructor(private readonly service: BetService) {}

  @Get('/bets')
  async handle(
    @Query() data: WithPaginationRequest<ListBetDto>,
    @CurrentUser() { sub: userId }: AuthPayload,
  ) {
    const result = validatePagination(data);
    return await this.service.listByGroup({
      ...result,
      groupId: data.groupId,
      userId,
    });
  }
}
