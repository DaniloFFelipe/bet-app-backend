import { Prisma, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as argon2 from 'argon2';
import { generateCode } from '../src/libs/nanoid/generate-code';

const prisma = new PrismaClient();

async function seed() {
  await prisma.betting.deleteMany();
  await prisma.member.deleteMany();
  await prisma.bet.deleteMany();
  await prisma.group.deleteMany();
  await prisma.user.deleteMany();

  const password = await argon2.hash('123123');
  const [userRaw, ...usersRaw] = [
    {
      email: 'danilo@d.com',
      fullName: 'Danilo Felipe',
      password,
      avatarUrl: 'https://github.com/daniloffelipe.png',
    },
    ...Array.from({ length: 10 }).map(() => ({
      email: faker.internet.email(),
      fullName: faker.person.fullName(),
      password,
      avatarUrl: faker.image.avatarGitHub(),
    })),
  ];

  const user = await prisma.user.create({
    data: userRaw,
  });

  await prisma.user.createMany({
    data: usersRaw,
  });

  const users = await prisma.user.findMany({
    where: {
      id: {
        not: user.id,
      },
    },
  });

  const members = [user, ...users];

  const gps: Prisma.GroupUncheckedCreateInput[] = Array.from({ length: 5 }).map(
    (_, i) => ({
      code: `${i}`.repeat(6),
      name: 'Group ' + i,
      description: faker.lorem.sentence(),
    }),
  );

  const groups = await Promise.all(
    gps.map((gp) =>
      prisma.group.create({
        data: gp,
      }),
    ),
  );

  await Promise.all(
    groups.map((g) =>
      prisma.member.createMany({
        data: members.map((u) => ({
          groupId: g.id,
          userId: u.id,
          role: u.id === user.id ? 'ADMIN' : 'MEMBER',
        })),
      }),
    ),
  );
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
