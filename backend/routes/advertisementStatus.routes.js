const  {getStatuses,getStatus,addStatus,updateStatus,deleteStatus} = require("../controllers/advertisementStatus.controller")
const { authenticate,authorize } = require("../middlewares/auth.middleware")

const express = require("express")
const statusRouter = express.Router()

statusRouter.route("/")
.get(getStatuses)
.post(addStatus)

statusRouter.route("/:id")
.get(getStatus)
.put(updateStatus)
.delete(deleteStatus)


module.exports = statusRouter