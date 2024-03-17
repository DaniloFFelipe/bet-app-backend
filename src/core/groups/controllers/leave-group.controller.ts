import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/libs/zod/pipe/zod-validation.pipe';
import { LeaveGroupDtoSchema, LeaveGroupDto } from '../dtos/leave-group.dto';
import { GroupsService } from '../services/groups.service';
import { CurrentUser } from 'src/libs/auth/current-user';
import { AuthPayload } from 'src/libs/auth/auth.type';

@Controller()
export class LeaveGroupController {
  constructor(private readonly service: GroupsService) {}

  @Post('/groups/leave')
  @UsePipes(new ZodValidationPipe(LeaveGroupDtoSchema))
  async handle(
    @Body() data: LeaveGroupDto,
    @CurrentUser() { sub: userId }: AuthPayload,
  ) {
    await this.service.leave({ ...data, userId });
  }
}
