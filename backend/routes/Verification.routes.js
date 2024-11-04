const express = require("express")
const verifyRouter = express.Router()
const {toVerify} = require("../controllers/verification.controller")

verifyRouter.route('/')
.post(toVerify)

module.exports = verifyRouter