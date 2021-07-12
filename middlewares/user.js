const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

async function validateAdminAuthorization(req, res, next) {
    try {
        if(!req.headers.authorization) return res.status(401).json({message:'Authorization required'})
        const RequestToken = req.headers.authorization.substring(7);
        const userId = jwt.verify(RequestToken, process.env.SECRET_TOKEN).id;
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: 'Not a valid token.' });
        if (!user.role) return res.status(401).json({ message: 'Required an administator account.' });
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Some sort of error ocurred.' });
    }
}

async function validateRegisterFields(req, res, next) {
    const error = {};
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const { username, fullname, email, tel, adress, password } = req.body;
    const someFieldIsEmpty = username.length === 0 || fullname.length === 0 || email.length === 0 || tel.length === 0 || adress.length === 0 || password.length === 0;
    const passIsTooShort = password.length < 6;
    const usernameIsTooShort = username.length < 6;
    if (usernameIsTooShort) error.message = 'Username must be at least 6 characters long';
    if (passIsTooShort) error.message = 'Password must be at least 6 characters long';
    if (!email.match(validRegex)) error.message = ' Must be a valid email ';
    if (someFieldIsEmpty) error.message = ' Fields are required ';
    if (Object.keys(error).length !== 0) return res.status(422).json(error)
    next();
}

async function validateUserIfExists(req, res, next) {
    const { username, email } = req.body;
    const errorMessage = { message: 'User with that email or username already exists.' }
    try {
        const userAlreadyExists = await User.findOne({ where: { [Op.or]: [{ username }, { email }] } });
        if (userAlreadyExists) return res.status(401).json(errorMessage)
        next();
    } catch (error) {
        console.log(e);
        return res.status(500)
            .json({ message: 'Could not perform operation at this time' });
    }
}

async function signUp(req, res) {
    const { username, fullname, email, tel, adress, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
    const newUser = await User.create({ username, fullname, email, tel, adress, password: hashedPassword, role: role ? role : 0 });
    res.status(201).json(newUser);
}

async function validateUserLogin(req, res, next) {
    const { username, email, password } = req.body;
    const error = { message: 'Invalid username or passwor' };
    const user = await User.findOne({ where: { [Op.or]: [username ? { username } : { email }] } });
    if (!user) return res.status(401).json(error);
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json(error);
    next();
}

async function signIn(req, res) {

    const { username, email } = req.body;
    const user = await User.findOne({ where: { [Op.or]: [username ? { username } : { email }] } });
    const token = jwt.sign({
        name: user.email,
        id: user.id
    }, process.env.SECRET_TOKEN, { expiresIn: "180m" })
    res.status(200).header('auth-token', token).json({ data: { token } });
}

module.exports = { 
    signUp, 
    signIn, 
    validateUserLogin, 
    validateRegisterFields, 
    validateUserIfExists, 
    validateAdminAuthorization
};