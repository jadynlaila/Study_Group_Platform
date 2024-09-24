const asyncHandler = require("express-async-handler")

// @desc    Get Goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "congrats u got your goals" })
})

// @desc    Set Goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.message) {
        res.status(400)
        throw new Error("u suck lol")
    }
    
    res.status(200).json({ message: "Set a goal" })
})

// @desc    Update Goal
// @route   PUT /api/goals
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Updated goal ${req.params.id}` })
})

// @desc    Delete Goals
// @route   DELETE /api/goals
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Deleted goal ${req.params.id}` })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}