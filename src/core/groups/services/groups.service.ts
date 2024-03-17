import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from '../dtos/create-group.dto';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { generateCode } from 'src/libs/nanoid/generate-code';
import { JoinGroupDto } from '../dtos/join-group.dto';
import { LeaveGroupDto } from '../dtos/leave-group.dto';
import {
  PaginationMetadata,
  PaginationRequest,
  PaginationResponse,
  WithPaginationRequest,
} from 'src/libs/dtos/pagination';
import { WithAuth } from 'src/libs/auth/auth.type';
import { Group } from '../group.model';

type CreateInput = CreateGroupDto & {
  userId: string;
};

type JoinInput = JoinGroupDto & {
  userId: string;
};

type LeaveInput = LeaveGroupDto & {
  userId: string;
};

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  async create({ userId, description, name }: CreateInput) {
    const code = generateCode();
    const group = this.prisma.group.create({
      data: {
        code,
        description,
        name,
        members: {
          create: {
            userId,
            role: 'ADMIN',
          },
        },
      },
    });

    return group;
  }

  async join({ code, userId }: JoinInput) {
    const group = await this.prisma.group.findUnique({
      where: {
        code,
      },
    });

    if (!group) {
      throw new BadRequestException('Invalid code');
    }

    const membershipExists = await this.prisma.member.findUnique({
      where: {
        userId_groupId: {
          groupId: group.id,
          userId,
        },
      },
    });

    if (membershipExists) {
      throw new BadRequestException('User already joined this group');
    }

    const membership = await this.prisma.member.create({
      data: {
        groupId: group.id,
        userId,
      },
    });

    return membership;
  }

  async leave({ userId, groupId }: LeaveInput) {
    const membership = await this.prisma.member.findUnique({
      where: {
        userId_groupId: {
          groupId,
          userId,
        },
      },
    });

    if (!membership) {
      throw new BadRequestException('User is not a member');
    }

    await this.prisma.member.delete({
      where: {
        id: membership.id,
      },
    });
  }

  async list({
    pageIndex,
    perPage,
    userId,
  }: WithAuth<PaginationRequest>): Promise<PaginationResponse<Group>> {
    const [data, total] = await Promise.all([
      this.prisma.group.findMany({
        where: {
          members: {
            some: {
              userId,
            },
          },
        },
        include: {
          _count: {
            select: {
              members: true,
            },
          },
          members: {
            select: {
              id: true,
              role: true,
              user: {
                select: {
                  id: true,
                  avatarUrl: true,
                },
              },
            },
            take: 5,
          },
        },
        take: perPage,
        skip: pageIndex * perPage,
      }),
      this.prisma.group.count({
        where: {
          members: {
            some: {
              userId,
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

  async find({ id, userId }: WithAuth<{ id: string }>) {
    const group = await this.prisma.group.findFirst({
      where: {
        id,
        members: {
          some: {
            userId,
          },
        },
      },
    });

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    return group;
  }

  async listMemberByScore({
    id,
    userId,
    pageIndex,
    perPage,
  }: WithPaginationRequest<WithAuth<{ id: string }>>) {
    const [data, total] = await Promise.all([
      this.prisma.member.findMany({
        where: {
          groupId: id,
          group: {
            members: {
              some: {
                userId,
              },
            },
          },
        },
        orderBy: {
          score: 'desc',
        },
        take: perPage,
        skip: pageIndex * perPage,
      }),
      this.prisma.member.count({
        where: {
          groupId: id,
          group: {
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
}
