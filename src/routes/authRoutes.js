const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
  console.log(req.headers);
  console.log(req.body);
  res.send('POST was received');
});

module.exports = router;
