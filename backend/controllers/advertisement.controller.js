const Advertisement = require("../models/advertisements.model");
const uploadOnCloudinary = require("../data/cloudinary");


const getAdvertisements = async function (req, res) {
  try {
    const advertisement = await Advertisement.find()
      .populate({ path: "PostedBy", populate: { path: "Role" } })
      .populate("Status")
      .populate("Type")
      .populate("Category")
      .populate("CityArea");
    return res.status(200).json(advertisement);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `failed to get Advertisement` });
  }
};

const getAdvertisementsByCategory = async function (req, res) {
  try {
    const categoryid = req.query.category;
    if (!categoryid) {
      return res.status(400).json({ message: `Please provide a category` });
    }

    const advertisements = await Advertisement.find({ Category: categoryid })
      .populate({ path: "PostedBy", populate: { path: "Role" } })
      .populate("Status")
      .populate("Type")
      .populate("Category")
      .populate("CityArea");

    if (!advertisements || advertisements.length === 0) {
      return res
        .status(404)
        .json({ msg: "No advertisements found with this category" });
    }

    return res.status(200).json(advertisements);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Failed to get advertisements` });
  }
};

const getAdvertisement = async function (req, res) {
  try {
    const advertisementId = req.params.id;
    const advertisement = await Advertisement.findById(advertisementId)
      .populate({ path: "PostedBy", populate: { path: "Role" } })
      .populate("Status")
      .populate("Type")
      .populate("Category")
      .populate("CityArea");
    return res.status(200).json(advertisement);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `failed to get Advertisement` });
  }
};

const addAdvertisement = async function (req, res) {
  try {
    const {
      Name,
      Price,
      Description,
      PostedBy,
      StartsOn,
      EndsOn,
      Status,
      Type,
      Category,
      CityArea,
      Image,
    } = req.body;
    const imageLocalPath = req.file?.path;
    console.log(imageLocalPath);
    if (!imageLocalPath)
      return res.status(404).json({ message: "Image is required" });

    const image = await uploadOnCloudinary(imageLocalPath);
    if (!image) return res.status(404).json({ message: `Image is required` });

    const advertisement = await Advertisement.create({
      Name,
      Price,
      Description,
      PostedBy,
      StartsOn,
      EndsOn,
      Status,
      Type,
      Category,
      CityArea,
      Image:image.url,
    });
    console.log(advertisement)
    res.header("location", `${req.originalUrl}/${advertisement._id}`);
    return res.status(201).json(advertisement);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `failed to add Advertisement` });
  }
};

const updateAdvertisement = async function (req, res) {
  try {
    const {
      Name,
      Price,
      Description,
      PostedBy,
      StartsOn,
      EndsOn,
      Status,
      Type,
      Category,
      CityArea,
    } = req.body;
    const advertisementId = req.params.id;
    const updated = await Advertisement.findByIdAndUpdate(
      advertisementId,
      {
        Name,
        Price,
        Description,
        PostedBy,
        StartsOn,
        EndsOn,
        Status,
        Type,
        Category,
        CityArea,
      },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({
        message: `failed to update Advertisement because it is not found`,
      });
    return res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `failed to update Advertisement` });
  }
};

const deleteAdvertisement = async function (req, res) {
  try {
    const advertisementId = req.params.id;
    const deleted = await Advertisement.findByIdAndDelete(advertisementId);
    if (!deleted)
      return res.status(404).json({
        message: `failed to delete Advertisement because it is not found`,
      });
    return res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `failed to delete Advertisement` });
  }
};

const getAdvertisementsBySearch = async function (req, res) {
  try {
    const { keyword, category, location } = req.query;

    // Define conditions based on provided parameters
    const conditions = {};

    if (keyword) {
      conditions.$text = { $search: keyword };
    }
    if (category) {
      conditions.Category = category;
    }
    if (location) {
      conditions.CityArea = location;
    }

    // Perform the search query with conditions
    const advertisements = await Advertisement.find(conditions);
    console.log(advertisements);
    return res.status(200).json(advertisements);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to get advertisement by search" });
  }
};

module.exports = {
  getAdvertisements,
  getAdvertisement,
  addAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
  getAdvertisementsByCategory,
  getAdvertisementsBySearch,
};
