require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const indexRouter = require("./routes/index-router");
const loginRouter = require("./routes/login-router");
const registerRouter = require("./routes/register-router");
const authRouter = require("./routes/auth-router");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

const distPath = path.join(__dirname, "../frontend/dist");

app.use("@", (req, res) => {
  res.sendFile(distPath, "index.html");
});

app.use(express.static(distPath));

app.use("/api/", indexRouter);
app.use("/api/login/", loginRouter);
app.use("/api/register/", registerRouter);

app.use("/api/auth/", authRouter);

app.listen(PORT, () => {
  console.log(`listening on http://${HOSTNAME}:${PORT}`);
});
