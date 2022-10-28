const asyncHandler = require('express-async-handler')
const goalModel = require('../models/goalModel');
const userModel = require("../models/userModel")

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req,res) => {
    const goals = await goalModel.find({user: req.user.id});

        res.status(200).json({
            statusCode: 200,
            data: goals
    })
} )

// @desc Create goal
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error("Please fill the text field")
    }
    const goal = await goalModel.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json({
        statusCode : 200,
        message: "The data has been successfully created",
        data: goal
    })
})

// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req,res) => {
    const goal = await goalModel.findById(req.params.id);

    const user = await userModel.findById(req.user.id);

    if(!user){
        res.status(401);
        throw new Error("User not Found");
    }

    if(!goal){
        res.status(404)
        throw new Error('Goal not found')
    }


    // make sure the login user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401);
        throw new Error("User not authorized")
    }


    const updatedGoal = await goalModel.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
    })


    res.status(200).json({
        statusCode : 200,
        message: `Goal with id ${req.params.id} has been successfully updated`,
        data: updatedGoal
    })
})

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req,res) => {
    const goal = await goalModel.findById(req.params.id);
    const user = await userModel.findById(req.user.id);

    if(!user){
        res.status(401);
        throw new Error("User not found");
    }

    if(!goal){
        res.status(404)
        throw new Error("Goal not found")
    }

    if(goal.user.toString() !== user.id){
        res.status(401);
        throw new Error("User not authorized")
    }

    const deletedGoal = await goalModel.findByIdAndDelete(req.params.id)

    res.status(200).json({
        statusCode : 200,
        message: `Goal with id ${req.params.id} successfully deleted`,
        data: deletedGoal
    })
})

module.exports = {getGoals,setGoal,updateGoal,deleteGoal}