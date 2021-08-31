

const express = require("express");
const usersController = require('../controllers/users-controller');



const router = express.Router();


router.get('/', usersController.getUsers);


router.post('/register', usersController.register);

router.post('/login', usersController.login);

module.exports = router;
