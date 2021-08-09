// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const passport = require("passport");
// const validateRegisterInput = require("../validation/register");
// const validateLoginInput = require("../validation/login");

// const User = require("../Models/User");

// router.post("/register", function (req, res) {
//   const { errors, isValid } = validateRegisterInput(req.body);
//   console.log(req.body);
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }
//   User.findOne({
//     email: req.body.email,
//   }).then((user) => {
//     if (user) {
//       return res.status(400).json({
//         email: "Email already exists",
//       });
//     } else {
//       const newUser = new User({
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         email: req.body.email,
//         password: req.body.password,
//       });

//       bcrypt.genSalt(10, (err, salt) => {
//         if (err) console.error("There was an error", err);
//         else {
//           bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if (err) console.error("There was an error", err);
//             else {
//               newUser.password = hash;
//               newUser.save().then((user) => {
//                 res.json(user);
//               });
//             }
//           });
//         }
//       });
//     }
//   });
// });

// router.post("/login", (req, res) => {
//   const { errors, isValid } = validateLoginInput(req.body);

//   if (!isValid) {
//     return res.status(400).json(errors);
//   }

//   const email = req.body.email;
//   const password = req.body.password;

//   User.findOne({ email }).then((user) => {
//     if (!user) {
//       errors.email = "User not found";
//       return res.status(404).json(errors);
//     }
//     bcrypt.compare(password, user.password).then((isMatch) => {
//       if (isMatch) {
//         const payload = {
//           id: user.id,
//           name: user.name,
//         };
//         jwt.sign(
//           payload,
//           "secret",
//           {
//             expiresIn: 3600,
//           },
//           (err, token) => {
//             if (err) console.error("There is some error in token", err);
//             else {
//               res.json({
//                 success: true,
//                 token: `Bearer ${token}`,
//               });
//             }
//           }
//         );
//       } else {
//         errors.password = "Incorrect Password";
//         return res.status(400).json(errors);
//       }
//     });
//   });
// });

// router.get(
//   "/me",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     return res.json({
//       id: req.user.id,
//       first_name: req.user.first_name,
//       last_name: req.user.last_name,
//       email: req.user.email,
//     });
//   }
// );

const express = require("express");
const usersController = require('../controllers/users-controller');
const router = express.Router();


router.get('/', usersController.getUsers);


router.post('/register', usersController.register);

router.post('/login', usersController.login);

module.exports = router;
