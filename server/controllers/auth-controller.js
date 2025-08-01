const { getUsernames } = require("../database/queries");

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
