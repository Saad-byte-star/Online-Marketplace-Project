const  {getAllCityAreas, getCityArea, updateCityArea, addCityArea, deleteCityArea } = require("../controllers/cityArea.controller")

const express = require("express")
const cityAreaRouter = express.Router()

cityAreaRouter.route("/")
.get(getAllCityAreas)
.post(addCityArea)

cityAreaRouter.route("/:id")
.get(getCityArea)
.put(updateCityArea)
.delete(deleteCityArea)


module.exports = cityAreaRouter