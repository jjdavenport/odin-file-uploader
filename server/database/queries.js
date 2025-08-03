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

const getUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

module.exports = { getUsernames, insertUser, getUserByUsername, getUserById };
