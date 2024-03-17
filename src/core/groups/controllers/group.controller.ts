import { Controller, Get, Param } from '@nestjs/common';
import { GroupsService } from '../services/groups.service';
import { CurrentUser } from 'src/libs/auth/current-user';
import { AuthPayload } from 'src/libs/auth/auth.type';

@Controller()
export class GroupController {
  constructor(private readonly service: GroupsService) {}

  @Get('/groups/:id')
  async handle(
    @Param() { id }: { id: string },
    @CurrentUser() { sub: userId }: AuthPayload,
  ) {
    await this.service.find({ userId, id });
  }
}
