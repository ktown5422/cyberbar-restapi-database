const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const UserRouter = require('./routes/users-routes');
const AppointmentRouter = require('./routes/appointments-routes');
const app = express();
const port = 3000;

require('./config/db');

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));


app.use(passport.initialize());
require('./passport')(passport);

app.get('/api/healthcheck', async (req, res) => {
  res.send('What hath God wrought?');
});

app.use('/api/users', UserRouter);
app.use('/api/appointments', AppointmentRouter);


// middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || 'An unknown error occured!'});
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})