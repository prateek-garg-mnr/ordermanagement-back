const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const { createUser, getUser, login } = require("../controllers/user");

router.post("/users", createUser);

router.get("/me", auth, getUser);

router.post("/users/login", login);

module.exports = router;
