const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const fs = require('fs');
const path = require('path');

const UserRouter = require('./routes/users-routes');
const AppointmentRouter = require('./routes/appointments-routes');
const HttpError = require('./Models/http-error');

const app = express();
const port = 3000;

// mongoose db config
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

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

// middleware
app.use('/api/users', UserRouter);
app.use('/api/appointments', AppointmentRouter);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404);
  throw error;
});

// middleware
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
    const status = err.status || 500;
    res.status(status);
    res.render('error');
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || 'An unknown error occured!'});
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})