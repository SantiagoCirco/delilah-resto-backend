const express = require('express');
const router = express.Router();
const {
    signUp,
    signIn,
    validateUserLogin,
    validateRegisterFields,
    validateUserIfExists,
} = require('../middlewares/user');



router.post('/register', validateRegisterFields, validateUserIfExists, signUp);

router.post('/login', validateUserLogin, signIn);


module.exports = router;