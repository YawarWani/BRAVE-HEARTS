const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const username = 'admin';
  const password = 'password123'; // Temporary password

  const existingAdmin = await prisma.admin.findUnique({
    where: { username }
  });

  if (existingAdmin) {
    console.log('Admin user already exists.');
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  console.log('Admin user created successfully!');
  console.log('Username:', admin.username);
  console.log('Password:', password);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
