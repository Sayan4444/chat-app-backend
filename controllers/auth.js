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

exports.getUserInfo = asyncHandler(async (req, res, next) => {
    console.log(req.user);
    if (!req.user) return next(new ErrorResponse('Not authenticated', 409));
    return res.status(200).json({
        success: true,
        user: req.user
    })
});

exports.signout = asyncHandler(async (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err)
    });
    return res.status(200).json({
        success: true
    })
});