const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { validateAdminAuthorization } = require('../middlewares/user');


router.get('/', validateAdminAuthorization, async (req, res) => {
    const users = await User.findAll();
    res.status(200).json(users);
});

router.get('/:id', validateAdminAuthorization, async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if(!user) res.status(404).json({message:'User not found'});
    res.status(200).json(user);
});

module.exports = router;



