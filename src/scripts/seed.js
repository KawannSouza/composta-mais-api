import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Cria usuário compostador
  const compostador = await prisma.user.create({
    data: {
      email: 'compostador@example.com',
      password: 'senhaSegura123', // só exemplo, ideal usar hash na prática
      name: 'Carlos',
      role: 'COMPOSTADOR',
    },
  });

  // Cria usuário doador
  const doador = await prisma.user.create({
    data: {
      email: 'doador@example.com',
      password: 'senhaSegura456',
      name: 'Ana',
      role: 'DOADOR',
    },
  });

  console.log('Usuários criados:', compostador, doador);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });