const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);

  if (authorization) {
    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_KEY, async(err, payload) => {
      if (err) return res.status(401).send({ error: 'You have bad token.' });
      const user = await User.findById(payload.userId);
      req.user = user;
      next();
    });
  } else {
    return res.status(401).send({ error: 'You must be logged in.' });
  }
}