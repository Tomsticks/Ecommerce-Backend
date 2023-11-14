const express = require("express");
const router = express.Router();
const userRoutes = require("./user");

const { loginUser, signUp } = require("../controllers/userController");
router.post("/login", () => {});
router.post("/register", () => {});

module.exports = router;
        