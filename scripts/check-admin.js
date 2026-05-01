const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const admins = await prisma.admin.findMany();
  console.log('\n=== Admins in Neon DB ===');
  console.log('Count:', admins.length);
  
  if (admins.length === 0) {
    console.log('❌ No admin found! You need to run the seed script.');
  } else {
    for (const admin of admins) {
      console.log('\nUsername:', admin.username);
      console.log('ID:', admin.id);
      console.log('Password hash:', admin.password.substring(0, 20) + '...');
      
      // Test if password123 matches
      const match = await bcrypt.compare('password123', admin.password);
      console.log('Does "password123" match?', match ? '✅ YES' : '❌ NO');
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
