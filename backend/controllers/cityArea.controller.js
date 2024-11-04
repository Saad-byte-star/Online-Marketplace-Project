const CityArea = require("../models/cityArea.model");

const getAllCityAreas = async (req, res) => {
  try {
    const cityareas = await CityArea.find().populate("City");
    return res.status(200).json( cityareas );
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to get cityareas" });
  }
};

const getCityArea = async (req, res) => {
  try {
    const cityareaId = req.params.id;
    const cityarea = await CityArea.findById(cityareaId).populate("City");
    return res.status(200).json( cityarea );
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to get cityarea" });
  }
};

const addCityArea = async (req, res) => {
  try {
    const { Name, City } = req.body;
    const cityareaAdded = await CityArea.create({ Name, City });
    res.header("location",`${req.originalUrl}/${cityareaAdded._id}`);
    return res
      .status(201)
      .json( cityareaAdded );
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to add cityarea" });
  }
};

const updateCityArea = async (req, res) => {
  try {
    const cityareaId = req.params.id;
    const { Name, City } = req.body;
    const cityarea = await CityArea.findByIdAndUpdate(
      cityareaId,
      { Name, City },
      { new: true }
    );

    if (!cityarea) {
      return res.status(404).json({ message: "CityArea not found" });
    }
    return res
      .status(200)
      .json( cityarea );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to update cityarea" });
  }
};

const deleteCityArea = async (req, res) => {
  try {
    const cityareaId = req.params.id;
    const cityarea = await CityArea.findByIdAndDelete(cityareaId);

    if (!cityarea) return res.status(404).json({ message: "CityArea not found" });
    
    return res.status(200).json(cityarea);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to delete cityarea" });
  }
};

module.exports = {
  getAllCityAreas,
  getCityArea,
  updateCityArea,
  addCityArea,
  deleteCityArea,
};
