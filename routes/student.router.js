const express = require('express')
const {
    getAllStudents,
    getStudent,
    signUpStudent ,
    loginStudent,

} = require('../controllers/student.controler')
const router = express.Router()

router.use(express.json())

router.get("/", getAllStudents )

router.get("/:id", getStudent);

router.post('/signup', signUpStudent);

router.post("/login", loginStudent);

module.exports = router;