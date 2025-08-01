const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.create({
    data: {
      username: "test",
      password: "password123",
    },
  });
};

main();
