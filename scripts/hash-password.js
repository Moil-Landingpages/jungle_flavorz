// Usage: node scripts/hash-password.js "my-strong-password"
// Then paste the output into ADMIN_PASSWORD_HASH in .env.local
const bcrypt = require("bcryptjs");

const pw = process.argv[2];
if (!pw) {
  console.error('Usage: node scripts/hash-password.js "your-password"');
  process.exit(1);
}

bcrypt.hash(pw, 10).then((hash) => {
  console.log(hash);
});
