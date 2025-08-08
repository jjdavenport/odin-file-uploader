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

const insertUpload = async (
  userId,
  file_name,
  file_original_name,
  file_type,
  file_size
) => {
  return await prisma.upload.create({
    data: { userId, file_name, file_original_name, file_type, file_size },
  });
};

const getFilesByUser = async (userId) => {
  return await prisma.upload.findMany({
    where: { userId: userId },
  });
};

const deleteFileById = async (id) => {
  return await prisma.upload.delete({
    where: { id: Number(id) },
  });
};

const insertFolder = async (userId, name) => {
  return await prisma.folder.create({
    data: { userId: userId, folder_name: name },
  });
};

const getFoldersByUser = async (userId) => {
  return await prisma.folder.findMany({
    where: { userId: userId },
  });
};

const getFileById = async (id) => {
  return await prisma.upload.findUnique({
    where: { id: Number(id) },
  });
};

const getFolderById = async (id) => {
  return await prisma.folder.findUnique({
    where: { id: Number(id) },
  });
};

const deleteFolderById = async (id) => {
  return await prisma.folder.delete({
    where: { id: Number(id) },
  });
};

const editFolderById = async (id, name) => {
  return await prisma.folder.update({
    where: { id: Number(id) },
    data: { folder_name: name },
  });
};

const editFileById = async (id, name, folderId) => {
  return await prisma.upload.update({
    where: { id: Number(id) },
    data: {
      file_original_name: name,
      folder: folderId ? { connect: { id: folderId } } : { disconnect: true },
    },
  });
};

module.exports = {
  getUsernames,
  insertUser,
  getUserByUsername,
  getUserById,
  insertUpload,
  getFilesByUser,
  deleteFileById,
  insertFolder,
  getFoldersByUser,
  getFileById,
  getFolderById,
  deleteFolderById,
  editFolderById,
  editFileById,
};
