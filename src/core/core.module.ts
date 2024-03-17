import { Module } from '@nestjs/common';
import { LibsModule } from 'src/libs/libs.module';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { BetModule } from './bet/bet.module';
import { ScoreModule } from './score/score.module';
import { ExternalModule } from 'src/external/external.module';

@Module({
  imports: [
    LibsModule,
    UsersModule,
    GroupsModule,
    BetModule,
    ScoreModule,
    ExternalModule,
  ],
})
export class CoreModule {}
