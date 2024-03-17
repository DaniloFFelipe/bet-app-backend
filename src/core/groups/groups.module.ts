import { Module } from '@nestjs/common';

import { GroupsService } from './services/groups.service';

import { CreateGroupController } from './controllers/create-group.controller';
import { JoinGroupController } from './controllers/join-group.controller';
import { LeaveGroupController } from './controllers/leave-group.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/libs/auth/auth.guard';
import { ListUserGroupsController } from './controllers/list-user-group.controller';
import { GroupController } from './controllers/group.controller';
import { ListMembersController } from './controllers/list-members.controller';

@Module({
  controllers: [
    CreateGroupController,
    JoinGroupController,
    LeaveGroupController,
    ListUserGroupsController,
    GroupController,
    ListMembersController,
  ],
  providers: [
    GroupsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class GroupsModule {}
