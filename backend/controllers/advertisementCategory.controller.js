const AdvertisementCategory = require("../models/advertisementCategories.model");
const Advertisement = require("../models/advertisements.model")
const uploadOnCloudinary = require("../data/cloudinary");
const getAdvertisementCategories = async (req, res) => {
  try {
    const categoriesWithAdCount = await AdvertisementCategory.aggregate([
      {
        $lookup: {
          from: 'advertisements', // Name of the advertisement collection
          localField: '_id',
          foreignField: 'Category', // Field in Advertisement that refers to the category
          as: 'advertisements'
        }
      },
      {
        $addFields: {
          adCount: { $size: "$advertisements" }
        }
      },
      {
        $project: {
          advertisements: 0 // Exclude advertisements array, keeping only the count
        }
      }
    ]);

    return res.status(200).json(categoriesWithAdCount);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to get Advertisement Categories' });
  }
};

const getAdvertisementCategory = async function (req, res) {
  try {
    const advertisementCategoryId = req.params.id;
    const advertisementCategory = await AdvertisementCategory.findById(
      advertisementCategoryId
    );
    return res.status(200).json(advertisementCategory);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `failed to get Advertisement Category` });
  }
};

const addAdvertisementCategory = async function (req, res) {
    try {
      const { Name } = req.body;
      const imageLocalPath = req.file?.path;
  
      // Check if Name and image file are provided
      if (!Name || !imageLocalPath) {
        return res.status(400).json({ message: `All fields are required` });
      }
  
      // Upload image to cloudinary (assuming the function is correct)
      const image = await uploadOnCloudinary(imageLocalPath);
      if (!image) {
        return res.status(404).json({ message: "Image upload failed" });
      }
  
      // Create the Advertisement Category
      const advertisementCategory = await AdvertisementCategory.create({
        Name,
        Image: image.url,
      });
  
      // Set the location header and respond with the created object
      res.header("location", `${req.originalUrl}/${advertisementCategory._id}`);
      return res.status(201).json(advertisementCategory);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: `Failed to add Advertisement Category` });
    }
  };
  
const updateAdvertisementCategory = async function (req, res) {
  try {
    const { Name, Image } = req.body;
    const advertisementCategoryId = req.params.id;
    const updated = await AdvertisementCategory.findByIdAndUpdate(
      advertisementCategoryId,
      { Name, Image },
      { new: true }
    );
    if (!updated)
      return res
        .status(404)
        .json({
          message: `failed to update Advertisement Category because it is not found`,
        });
    return res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `failed to update Advertisement Category` });
  }
};

const deleteAdvertisementCategory = async function (req, res) {
  try {
    const advertisementCategoryId = req.params.id;
    const deleted = await AdvertisementCategory.findByIdAndDelete(
      advertisementCategoryId
    );
    if (!deleted)
      return res
        .status(404)
        .json({
          message: `failed to delete Advertisement Category because it is not found`,
        });
    return res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `failed to delete Advertisement Category` });
  }
};

module.exports = {
  getAdvertisementCategories,
  getAdvertisementCategory,
  addAdvertisementCategory,
  updateAdvertisementCategory,
  deleteAdvertisementCategory,
};
