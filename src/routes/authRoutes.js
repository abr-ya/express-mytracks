const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const router = express.Router();

const createAndSendToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_KEY);
  res.send({ token });
};

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = new User({ email, password });
    console.log(user);
    await user.save();
    createAndSendToken(user._id, res);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: 'E-mail or pass is empty!(' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: 'E-mail not found!(' });
  }

  try {
    await user.comparePassword(password);
    createAndSendToken(user._id, res);
  } catch (err) {
    return res.status(422).send({ error: 'Invalid password!(' });
  }
});

module.exports = router;
