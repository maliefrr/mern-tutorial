const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");


// @desc Register new user
// @route POST /api/users
// @access public
const registerUser = asyncHandler(async (req,res) => {
    const {name,email,password,passwordConfirmation} = req.body;
    if(!name || !email || !password || !passwordConfirmation ){
        res.status(400);
        throw new Error("Please fill all the field");
    }
    if(password !== passwordConfirmation){
        res.status(400);
        throw new Error("Password and Password Confirmation field didn't match")
    }

    // check if the user exist
    const user = await userModel.findOne({email});

    if(user){
        res.status(400);
        throw new Error("The user has already exist")
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);

    const newUser = await userModel.create({
        name,
        email,
        password : hash
    })

    if(newUser){
    res.status(201).json({
        statusCode: 201,
        message: "User has been successfully registered",
        data: {
            _id : newUser.id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        }
    })
    } else {
        res.status(400);
        throw new Error("Invalid user data")
    }

})

// @desc Authenticate a user
// @route POST /api/users/login
// @access public
const login = asyncHandler(async (req,res) => {
    const {email,password} = req.body;

    // check user exist
    const userExist = await userModel.findOne({email})
    if(userExist && (await bcrypt.compare(password,userExist.password))){
        res.status(200).json({
            statusCode: 200,
            message: "Successfully Login",
            data: {
                _id: userExist.id,
                name: userExist.name,
                email: userExist.email,
                token: generateToken(userExist._id)
            }
        })
    } else {
        res.status(400);
        throw new Error("Invalid Login data check the email or password you input")
    }

})

// @desc Get user data
// @route GET /api/user/me
// @access private
const getMe = asyncHandler(async (req,res) => {
    const {_id,name,email} = await userModel.findById(req.user.id);
    res.status(200).json({
        statusCode: 200,
        message: "Get user login data",
        data: {
            id: _id,
            name,
            email
        }
    })
})


// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: "1d"
    })
}

module.exports = {
    registerUser,
    login,
    getMe
}