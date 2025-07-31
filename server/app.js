require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

const distPath = path.join(__dirname, "../frontend/dist");

app.use("@", (req, res) => {
  res.sendFile(distPath, "index.html");
});

app.use(express.static(distPath));

app.listen(PORT, () => {
  console.log(`listening on http://${HOSTNAME}:${PORT}`);
});
