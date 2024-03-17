import { Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';

import { ScoreService } from '../score.service';
import { QUEUE_KEYS } from 'src/libs/queue/keys';
import { UpdateScoresDto } from '../dtos/update-score.dto';

@Processor(QUEUE_KEYS.BET_END)
export class UpdateScoresConsumer {
  constructor(private service: ScoreService) {}

  @Process()
  async process(job: Job<UpdateScoresDto>) {
    await this.service.updateScore(job.data);
  }
}
