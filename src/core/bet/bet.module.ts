import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/libs/auth/auth.guard';
import { BetService } from './services/bet.service';
import { BullModule } from '@nestjs/bull';
import { QUEUE_KEYS } from 'src/libs/queue/keys';
import { CreateBetController } from './controllers/create-bet.controller';
import { EndBetController } from './controllers/end-bet.controller';
import { ListBetsController } from './controllers/list-bets.controller';
import { MakeBetController } from './controllers/make-bet.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_KEYS.BET_END,
    }),
  ],
  controllers: [
    CreateBetController,
    EndBetController,
    ListBetsController,
    MakeBetController,
  ],
  providers: [
    BetService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class BetModule {}
