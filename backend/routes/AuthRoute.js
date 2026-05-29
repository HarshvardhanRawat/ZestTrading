const { signup, login, userVerification, logout } = require("../controllers/AuthController");
const express = require("express");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify", userVerification);
router.post("/logout", logout);

module.exports = router;