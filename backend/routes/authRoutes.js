const express = require("express")
const router = express.Router()

const {createStudent, login} = require("../controllers/authController")

router.route("/").get((req, res) => {
    console.log("Login route hit");
    login(req, res);
  });
router.route("/signup").post(createStudent)
router.route("/login").post(login)

module.exports = router