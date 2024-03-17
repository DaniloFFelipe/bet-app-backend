import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/libs/zod/pipe/zod-validation.pipe';
import { CreateGroupDtoSchema, CreateGroupDto } from '../dtos/create-group.dto';
import { GroupsService } from '../services/groups.service';
import { CurrentUser } from 'src/libs/auth/current-user';
import { AuthPayload } from 'src/libs/auth/auth.type';

@Controller()
export class CreateGroupController {
  constructor(private readonly service: GroupsService) {}

  @Post('/groups')
  @UsePipes(new ZodValidationPipe(CreateGroupDtoSchema))
  async handle(
    @Body() data: CreateGroupDto,
    @CurrentUser() { sub: userId }: AuthPayload,
  ) {
    await this.service.create({ ...data, userId });
  }
}
