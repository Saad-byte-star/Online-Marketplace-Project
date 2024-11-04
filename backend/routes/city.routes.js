const {getAllCities, getCity, updateCity, addCity, deleteCity } = require("../controllers/city.controller")

const express = require("express")
const cityRouter = express.Router()

cityRouter.route("/")
.get(getAllCities)
.post(addCity)

cityRouter.route("/:id")
.get(getCity)
.put(updateCity)
.delete(deleteCity)


module.exports = cityRouter
