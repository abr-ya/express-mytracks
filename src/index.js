require('dotenv').config();
require('./models/User');
require('./models/Track');
require('./models/Log');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();
const PORT = 3030;

app.get('/', requireAuth, (req, res) => {
  res.send(`Hello, World! (email: ${req.user.email})`);
});

app.use(bodyParser.json()); // порядок важен!
app.use(authRoutes);
app.use(trackRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Conneted to mongoDB.');
});
mongoose.connection.on('error', (error) => {
  console.log('Error connected to mongoDB:', error);
});

app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}.`);
});
