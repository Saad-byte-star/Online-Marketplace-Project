const {getRoles,getRole,addRole,updateRole,deleteRole} = require('../controllers/role.controller')
const express = require("express")
const roleRouter = express.Router()

roleRouter.route("/")
.get(getRoles)
.post(addRole)

roleRouter.route("/:id")
.get(getRole)
.put(updateRole)
.delete(deleteRole)


module.exports = roleRouter
