const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

require('./config/db');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

const UserRouter = require('./api/User');

app.use(passport.initialize());
require('./passport')(passport);

app.get('/healthcheck', async (req, res) => {
  res.send('What hath God wrought?');
});

app.use('/user', UserRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})