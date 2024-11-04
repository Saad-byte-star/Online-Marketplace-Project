const Country = require("../models/country.model");

const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    return res.status(200).json(countries);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get countries" });
  }
};

const getCountry = async (req, res) => {
  try {
    const countryId = req.params.id;
    const country = await Country.findById(countryId);
    return res.status(200).json(country);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get country" });
  }
};

const addCountry = async (req, res) => {
  try {
    const { Name, Code } = req.body;
    const countryAdded = await Country.create({ Name, Code });
    res.header("location", `${req.originalUrl}/${countryAdded._id}`);
    return res.status(201).json(countryAdded);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to add country" });
  }
};

const updateCountry = async (req, res) => {
  try {
    const countryId = req.params.id;
    const { Name, Code } = req.body;
    const country = await Country.findByIdAndUpdate(countryId,{ Name, Code },{ new: true });

    if (!country)
      return res
        .status(400)
        .json({ message: `failed to update country because it is not found` });
    return res.status(200).json(country);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to update country" });
  }
};

const deleteCountry = async (req, res) => {
  try {
    const countryId = req.params.id;
    const country = await Country.findByIdAndDelete(countryId);

    if (!country)
      return res.status(400).json({ message: "failed to delete country" });

    return res.status(200).json(country);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to delete country" });
  }
};

module.exports = {
  getAllCountries,
  getCountry,
  updateCountry,
  addCountry,
  deleteCountry,
};
