const City = require("../models/city.model");

const getAllCities = async (req, res) => {
  try {
    const cities = await City.find().populate("Province");
    return res.status(200).json(cities);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Failed to get cities" });
  }
};

const getCity = async (req, res) => {
  try {
    const cityId = req.params.id;
    const city = await City.findById(cityId).populate("Province");
    return res.status(200).json(city);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Failed to get city" });
  }
};

const addCity = async (req, res) => {
  try {
    const { Name, Province } = req.body;
    const cityAdded = await City.create({ Name, Province });
    res.header("location",`${req.originalUrl}/${cityAdded._id}`);
    return res.status(201).json( cityAdded );
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Failed to add city" });
  }
};

const updateCity = async (req, res) => {
  try {
    const cityId = req.params.id;
    const { Name, Province } = req.body;
    const city = await City.findByIdAndUpdate(
      cityId,
      { Name, Province },
      { new: true }
    );

    if (!city) return res.status(404).json({ msg: "City not found" });

    return res.status(200).json( city );
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Failed to update city" });
  }
};

const deleteCity = async (req, res) => {
  try {
    const cityId = req.params.id;
    const city = await City.findByIdAndDelete(cityId);

    if (!city) return res.status(404).json({ msg: "City not found" });

    return res.status(200).json(city);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Failed to delete city" });
  }
};

module.exports = { getAllCities, getCity, updateCity, addCity, deleteCity };
