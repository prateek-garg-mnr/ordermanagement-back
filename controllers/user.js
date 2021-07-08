const Users = require("../models/user");

const createUser = async (req, res) => {
  const user = new Users(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();

    res.status(200).send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: e.message });
  }
};

const getUser = async (req, res) => {
  res.send(req.user);
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("email and password are required");
    }
    const user = await Users.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user: user, token });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

module.exports = { createUser, getUser, login };
