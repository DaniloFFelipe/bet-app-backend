import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QUEUE_KEYS } from 'src/libs/queue/keys';
import { UpdateScoresConsumer } from './consumers/update-scores.consumer';
import { ScoreService } from './score.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_KEYS.BET_END,
    }),
  ],
  providers: [ScoreService, UpdateScoresConsumer],
})
export class ScoreModule {}
