const jwt = require("jsonwebtoken");
const Student = require("../models/StudentModel");

const protectRoute = async(req,res,next) => {
    try{
        const token = req.cookies.jwt;
        console.log(`HI ${token}`)
        if(!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({ error: "Unauthorized - Invalid Token"});
        }

        const student = await Student.findById(decoded.username).select("-password");

        if (!student){
            return res.status(404).json({ error: "User not found"});
        }

        req.student = student

        next();

    } catch (error) {
        console.log("Error in protectRoute middleware", error.message)
        res.status(500).json({ error: "Internal server error"}); 
    }
};

module.exports = {protectRoute};