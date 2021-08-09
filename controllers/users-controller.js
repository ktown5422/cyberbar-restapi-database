require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const User = require("../Models/User");
const HttpError = require("../Models/http-error");

const url = process.env.MONGODB_URI;

const getUsers = async(req, res, next) => {
    const client = new MongoClient(url);
    let users
    try {
        await client.connect();
        const db = client.db();
        users = await db.collection('users').find().toArray();
    } catch (err) {
        throw new HttpError('could not retrieve users')
    };
    client.close();

    res.json(users);
};

const register = (req, res, next) => {
    const { errors, isValid } = validateRegisterInput(req.body);
  console.log(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user) {
      return res.status(400).json({
        email: "Email already exists",
      });
    } else {
      const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error("There was an error", err);
        else {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.error("There was an error", err);
            else {
              newUser.password = hash;
              newUser.save().then((user) => {
                res.json(user);
              });
            }
          });
        }
      });
    }
  });
};

const login = (req, res, next) => {
    const { errors } = validateLoginInput(req.body);

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "User email not found";
      return res.status(404).json(errors.email);
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
        };
        jwt.sign(
          payload,
          "secret",
          {
            expiresIn: 3600,
          },
          (err, token) => {
            if (err) console.error("There is some error in token", err);
            else {
              res.json({
                success: true,
                token: `Bearer ${token}`,
              });
            }
          }
        );
      } else {
        errors.password = "Incorrect Password";
        return res.status(400).json(errors);
      }
    });
  });
};

exports.getUsers = getUsers;
exports.login = login;
exports.register = register;
