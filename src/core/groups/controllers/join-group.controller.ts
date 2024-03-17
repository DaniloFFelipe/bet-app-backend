import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/libs/zod/pipe/zod-validation.pipe';
import { JoinGroupDtoSchema, JoinGroupDto } from '../dtos/join-group.dto';
import { GroupsService } from '../services/groups.service';
import { CurrentUser } from 'src/libs/auth/current-user';
import { AuthPayload } from 'src/libs/auth/auth.type';

@Controller()
export class JoinGroupController {
  constructor(private readonly service: GroupsService) {}

  @Post('/groups/join')
  @UsePipes(new ZodValidationPipe(JoinGroupDtoSchema))
  async handle(
    @Body() data: JoinGroupDto,
    @CurrentUser() { sub: userId }: AuthPayload,
  ) {
    await this.service.join({ ...data, userId });
  }
}
