import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WithAuth } from 'src/libs/auth/auth.type';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { CreateBetDto } from '../dtos/create-bet.dto';
import { FindBetDto } from '../dtos/find-bet.dto';
import { MakeBetDto } from '../dtos/make-bet.dto';
import {
  PaginationMetadata,
  WithPaginationRequest,
} from 'src/libs/dtos/pagination';
import { ListBetDto } from '../dtos/list-bet.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { QUEUE_KEYS } from 'src/libs/queue/keys';
import { UpdateScoresDto } from 'src/core/score/dtos/update-score.dto';
import { EndsBetDto } from '../dtos/ends-bet.dto';

@Injectable()
export class BetService {
  constructor(
    private service: PrismaService,
    @InjectQueue(QUEUE_KEYS.BET_END) private betsQueue: Queue<UpdateScoresDto>,
  ) {}

  async create({ userId, participants, groupId }: WithAuth<CreateBetDto>) {
    const membership = await this.service.member.findUnique({
      where: {
        userId_groupId: {
          groupId,
          userId,
        },
      },
    });

    if (!membership) throw new ForbiddenException();
    if (membership.role === 'MEMBER') throw new ForbiddenException();

    const bet = await this.service.bet.create({
      data: {
        groupId,
        participant: {
          createMany: {
            data: participants.map((p) => ({
              name: p.name,
              pictureUrl: p.pictureUrl,
            })),
          },
        },
      },
      include: {
        participant: true,
      },
    });

    return bet;
  }

  async find({ betId, userId }: WithAuth<FindBetDto>) {
    const bet = await this.service.bet.findFirst({
      where: {
        id: betId,
        group: {
          members: {
            some: {
              userId,
            },
          },
        },
      },
      include: {
        betings: {
          where: {
            member: {
              userId,
            },
          },
        },
      },
    });

    if (!bet) throw new NotFoundException();

    return bet;
  }

  async bet({ betId, userId, participantChooseId }: WithAuth<MakeBetDto>) {
    const bet = await this.service.bet.findFirst({
      where: {
        id: betId,
        group: {
          members: {
            some: {
              userId,
            },
          },
        },
      },
    });

    if (!bet) throw new NotFoundException();

    const membership = await this.service.member.findUnique({
      where: {
        userId_groupId: {
          groupId: bet.groupId,
          userId,
        },
      },
    });

    if (!membership) throw new NotFoundException();

    const betting = await this.service.betting.findUnique({
      where: {
        memberId_betId: {
          betId: bet.id,
          memberId: membership.id,
        },
      },
    });

    if (betting) throw new BadRequestException('Bet already done');

    return await this.service.betting.create({
      data: {
        participantChoosedId: participantChooseId,
        betId,
        memberId: membership?.id,
      },
    });
  }

  async listByGroup({
    groupId,
    userId,
    pageIndex,
    perPage,
  }: WithPaginationRequest<WithAuth<ListBetDto>>) {
    const [data, total] = await Promise.all([
      this.service.bet.findMany({
        where: {
          group: {
            id: groupId,
            members: {
              some: {
                userId,
              },
            },
          },
        },
        include: {
          participant: {
            select: {
              id: true,
              name: true,
              pictureUrl: true,
            },
          },
          betings: {
            where: {
              member: {
                userId,
              },
            },
          },
        },
        take: perPage,
        skip: pageIndex * perPage,
      }),
      this.service.bet.count({
        where: {
          group: {
            id: groupId,
            members: {
              some: {
                userId,
              },
            },
          },
        },
      }),
    ]);

    const hasNextPage = pageIndex + 1 <= total / perPage;
    const responseMetadata: PaginationMetadata = {
      nextPageIndex: hasNextPage ? pageIndex + 1 : null,
      pageIndex,
      perPage,
      total,
    };

    return {
      meta: responseMetadata,
      data,
    };
  }

  async ends({ betId, userId, winnerId }: WithAuth<EndsBetDto>) {
    const bet = await this.service.bet.findFirst({
      where: {
        id: betId,
        group: {
          members: {
            some: {
              userId,
            },
          },
        },
      },
    });

    if (!bet) throw new NotFoundException();

    const membership = await this.service.member.findUnique({
      where: {
        userId_groupId: {
          groupId: bet.groupId,
          userId,
        },
      },
    });

    if (!membership) throw new ForbiddenException();
    if (membership.role === 'MEMBER') throw new ForbiddenException();

    await this.service.bet.update({
      where: {
        id: bet.id,
      },
      data: {
        participantWinnerId: winnerId,
        endedAt: new Date(),
      },
    });

    await this.betsQueue.add({
      betId,
      winnerId,
    });
  }
}
