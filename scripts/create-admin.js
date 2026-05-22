// Usage: node scripts/create-admin.js admin@example.com "your-password"
// Creates or updates an AdminUser row in the database.
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

(async () => {
  const [, , rawEmail, password] = process.argv;
  if (!rawEmail || !password) {
    console.error('Usage: node scripts/create-admin.js <email> "<password>"');
    process.exit(1);
  }
  const email = rawEmail.toLowerCase();
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });
  console.log(`Admin upserted: ${user.email} (id=${user.id})`);
  await prisma.$disconnect();
})().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
