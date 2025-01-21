import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();
async function main() {
  const passwordHashed = await argon2.hash('123456');

  const abir = await prisma.users.upsert({
    where: { email: 'asif@mail.com' },
    update: {},
    create: {
      email: 'asif@mail.com',
      name: 'Asif Jalil',
      password: passwordHashed,
    },
  });

  console.log({ abir });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
