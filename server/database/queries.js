const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUsernames = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

const insertUser = async (username, password) => {
  return await prisma.user.create({
    data: { username, password },
  });
};

module.exports = { getUsernames, insertUser };
