const Carousel = require("../models/carousel.model");
const uploadOnCloudinary = require("../data/cloudinary");

async function getCarousels(req, res) {
  try {
    const carousel = await Carousel.find();
    return res.status(200).json(carousel);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Failed to get carousel images` });
  }
}

async function addCarousel(req, res) {
  try {
   
    const { Image, Title, Description } = req.body;
    // if (!Image || !Title || !Description) return res.status(400).json({ message: `All Fields are required` });
    const imageLocalPath = req.file?.path;
    if (!imageLocalPath)return req.status(400).json({ message: `Image is required` });
    const image = await uploadOnCloudinary(imageLocalPath);

    if (!image) return res.status(404).json({ message: `Image is required` });
    const carousel = await Carousel.create({
      Image: image.url,
      Title,
      Description,
    });
    return res.status(201).json(carousel);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Failed to add carousel images` });
  }
}


module.exports={getCarousels,addCarousel}