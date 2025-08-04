require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const indexRouter = require("./routes/index-router");
const loginRouter = require("./routes/login-router");
const registerRouter = require("./routes/register-router");
const authRouter = require("./routes/auth-router");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const passport = require("passport");
const authenticate = require("./middleware/authenticate");
require("./passport-config");

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

const distPath = path.join(__dirname, "../frontend/dist");

app.use(express.json());
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
    secret: "cats",
    store: new PrismaSessionStore(new PrismaClient(), {
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
      checkPeriod: 2 * 60 * 1000,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("@", (req, res) => {
  res.sendFile(distPath, "index.html");
});

app.use(express.static(distPath));

app.use("/api/", indexRouter);
app.use("/api/login/", loginRouter);
app.use("/api/register/", registerRouter);

app.use(authenticate);

app.use("/api/auth/", authRouter);

app.listen(PORT, () => {
  console.log(`listening on http://${HOSTNAME}:${PORT}`);
});
