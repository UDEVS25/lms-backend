const express = require('express');
const {
  signUp  
} = require('../controllers/userController');
const expressAsyncHandler = require('express-async-handler');

const router = express.Router();

router.post('/signup', expressAsyncHandler(signUp));

module.exports = router;