const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUsernames = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

module.exports = { getUsernames };
