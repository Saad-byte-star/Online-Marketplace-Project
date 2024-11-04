const {getUsers,getUser,addUser,updateUser,deleteUser,login,getCurrentUser} = require('../controllers/user.controller')
const {authenticate,authorize,} = require("../middlewares/auth.middleware")
const upload = require("../middlewares/multer.middleware")
const express = require("express")
const userRouter = express.Router()

userRouter.route("/")
.get(getUsers)
.post(upload.single("Image"),addUser)

userRouter.route("/user")
.get(authenticate,getCurrentUser)

userRouter.route("/login")
.post(login)

userRouter.route("/:id")
.get(getUser)
.put(updateUser)
.delete(deleteUser)


module.exports = userRouter