const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Track = mongoose.model('Track');
const router = express.Router();
const PATH = '/tracks';

const createAndSendToken = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_KEY);
  const log = new Log({ user: userId, do: 'createToken' });
  await log.save();
  res.send({ token });
};

router.use(requireAuth);

router.get(PATH, async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });

  res.send(tracks);
});

router.post(PATH, async (req, res) => {
  const { name, locations } = req.body;
  console.log(name, locations);
  if (!name || !locations) return res.status(422).send({ error: 'Empty name or locations' });

  try {
    const track = new Track({ name, locations, userId: req.user._id });
    await track.save();
    res.send(track);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
