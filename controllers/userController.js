const User = require("../models/userModels");

const loginUser = async (req, res) => {
  res.json({ mssg: "login user" });
};
const signUp = async (req, res) => {
  res.json({ mssg: "sign up user" });
};

module.exports = { loginUser, signUp };
