const User = require('../model/User.js');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse.js');
const bcrypt = require('bcrypt');

exports.signup = asyncHandler(async (req, res, next) => {
    const { name, email, password, picture } = req.body;
    //checking if user already exsists
    const user = await User.findOne({ email });
    if (user) return next(new ErrorResponse('User already exsists', 409));

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    //Create user
    await User.create({ name, email, password: passwordHashed, picture: 'abc' })

    return res.status(201).json({
        success: true
    })
});

exports.signin = asyncHandler(async (req, res, next) => {
    const { email, password, } = req.body;
    console.log('hello');
    return;
});