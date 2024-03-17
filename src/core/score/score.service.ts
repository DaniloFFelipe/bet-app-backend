import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { UpdateScoresDto } from './dtos/update-score.dto';

@Injectable()
export class ScoreService {
  constructor(private prisma: PrismaService) {}

  async updateScore({ betId, winnerId }: UpdateScoresDto) {
    const membersToUpdate = (
      await this.prisma.betting.findMany({
        where: {
          betId,
          participantChoosedId: winnerId,
        },
      })
    ).map((m) => m.memberId);

    await this.prisma.member.updateMany({
      where: {
        id: {
          in: membersToUpdate,
        },
      },
      data: {
        score: {
          increment: 100,
        },
      },
    });
  }
}
