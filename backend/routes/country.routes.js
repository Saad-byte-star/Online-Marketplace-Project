const {getAllCountries, getCountry, updateCountry, addCountry, deleteCountry } = require('../controllers/country.controller')
const express = require("express")
const countryRouter = express.Router()

countryRouter.route("/")
.get(getAllCountries)
.post(addCountry)

countryRouter.route("/:id")
.get(getCountry)
.put(updateCountry)
.delete(deleteCountry)


module.exports = countryRouter