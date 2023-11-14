const express = require("express");
const app = express();
const mongooes = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const userModels = require("./models/userModels");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

const maxAge = 3 * 24 * 60 * 60;
const CreateToken = (id) => {
  return jwt.sign({ id }, "tomzorsecret", {
    expiresIn: maxAge,
  });
};
app.use(express.json());
app.use(cors());
app.use(cookieParser());
mongooes
  .connect(
    "mongodb+srv://tscript:mira247a@tomzor.axomd8j.mongodb.net/ecommerce"
  )
  .then(() => {
    app.listen(PORT, function () {
      console.log(`app listening on port ${PORT}, DataBase Connected`);
    });
  });

app.post("/register", (req, res) => {
  userModels
    .create(req.body)
    .then((user) => {
      const token = CreateToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      res.json(user._id);
    })
    .catch((err) => res.json(err));
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModels.userSchema.login(email, password);
    const get = user._id;
    res.status(200).json({ get, email, message: "sucess" });
  } catch (error) {
    res.status(400).json({ error: "error present" });
  }
});
