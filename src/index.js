require('dotenv').config();
require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 3030;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(bodyParser.json()); // порядок важен!
app.use(authRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Conneted to mongoDB');
});
mongoose.connection.on('error', (error) => {
  console.log('Error conneted to mongoDB:', error);
});

app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}.`);
});
