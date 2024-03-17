import { Controller, Get, Param, Query } from '@nestjs/common';
import { GroupsService } from '../services/groups.service';
import { CurrentUser } from 'src/libs/auth/current-user';
import { AuthPayload } from 'src/libs/auth/auth.type';
import {
  PaginationRequest,
  validatePagination,
} from 'src/libs/dtos/pagination';

@Controller()
export class ListMembersController {
  constructor(private readonly service: GroupsService) {}

  @Get('/groups/:id/member')
  async handle(
    @Param() { id }: { id: string },
    @Query() data: PaginationRequest,
    @CurrentUser() { sub: userId }: AuthPayload,
  ) {
    const result = validatePagination(data);
    return await this.service.listMemberByScore({ ...result, userId, id });
  }
}
