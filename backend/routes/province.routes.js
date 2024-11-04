const {getAllProvince, getProvince, addProvince, updateProvince, deleteProvince } = require("../controllers/province.controller")

const express = require("express")
const provinceRouter = express.Router()

provinceRouter.route("/")
.get(getAllProvince)
.post(addProvince)

provinceRouter.route("/:id")
.get(getProvince)
.put(updateProvince)
.delete(deleteProvince)


module.exports = provinceRouter