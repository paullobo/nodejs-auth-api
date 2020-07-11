var express = require('express');
var router = express.Router();
const authController = require("../controller/authUserController")

router.put('/register', authController.register)
router.post('/login', authController.login)

module.exports = router