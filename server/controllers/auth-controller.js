const { getUsernames, insertUser } = require("../database/queries");
const bcrypt = require("bcrypt");
const passport = require("passport");

exports.checkUsernamesLogin = async (req, res) => {
  const { username } = req.body;
  const usernameExits = await getUsernames(username);
  res.json({ exists: usernameExits });
};

exports.checkUsernamesRegister = async (req, res) => {
  const { username } = req.body;
  const usernameAvailable = await getUsernames(username);
  res.json({ available: !usernameAvailable });
};

exports.addUser = async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  if (!username | !password | !confirmPassword) {
    return res.status(400).json({ success: false, message: "missing inputs" });
  }
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ success: false, message: "passwords do not match" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await insertUser(username, hashedPassword);
    return res.status(200).json({ success: true, message: "user added" });
  } catch (error) {
    console.error("Error inserting user:", error);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

exports.login = async (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) return next(error);
    if (!user) {
      return res.status(401).json({ success: false, message: info.message });
    }
    req.login(user, (error) => {
      if (error) return next(error);
      return res.status(200).json({ success: true, message: "logged in" });
    });
  })(req, res, next);
};
