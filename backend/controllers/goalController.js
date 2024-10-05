const asyncHandler = require("express-async-handler")
const Goal = require('../models/GroupModel');

// @desc    Get Goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()
    res.status(200).json({ goals });
})

// @desc    Set Goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400)
        throw new Error("u suck lol")
    }
    const goal = await Goal.create({
        name: req.body.name
    })
    res.status(200).json(goal)
})

// @desc    Update Goal
// @route   PUT /api/goals
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal){
        res.status(400);
        throw new Error('Group not found');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedGoal)
})

// @desc    Delete Goals
// @route   DELETE /api/goals
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedGoal)
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}