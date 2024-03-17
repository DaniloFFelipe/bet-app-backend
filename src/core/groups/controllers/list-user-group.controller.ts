import { Controller, Get, Query } from '@nestjs/common';
import { GroupsService } from '../services/groups.service';
import { CurrentUser } from 'src/libs/auth/current-user';
import { AuthPayload } from 'src/libs/auth/auth.type';
import {
  PaginationRequest,
  validatePagination,
} from 'src/libs/dtos/pagination';

@Controller()
export class ListUserGroupsController {
  constructor(private readonly service: GroupsService) {}

  @Get('/groups')
  async handle(
    @Query() data: PaginationRequest,
    @CurrentUser() { sub: userId }: AuthPayload,
  ) {
    const result = validatePagination(data);
    return await this.service.list({ ...result, userId });
  }
}
