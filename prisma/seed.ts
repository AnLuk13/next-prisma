import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.users.createMany({
    data: [
      { name: 'Alice Johnson', email: 'alice@example.com', age: 28 },
      { name: 'Bob Smith', email: 'bob@example.com', age: 35 },
      { name: 'Charlie Lee', email: 'charlie@example.com', age: 22 },
      { name: 'Diana Park', email: 'diana@example.com', age: 30 },
      { name: 'Ethan Clark', email: 'ethan@example.com', age: 26 },
    ],
  });

  console.log('✅ Users seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
