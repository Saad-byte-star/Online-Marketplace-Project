const AdvertisementImage = require("../models/advertisementImage.model")

const getAdvertisementImages= async function (req, res) {
    try {
        const advertisementImage = await AdvertisementImage.find().populate("Advertisement")
        return res.status(200).json(advertisementImage)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`failed to get AdvertisementImage`})
    }
}

const getAdvertisementImage= async function (req, res) {
    try {
        const advertisementImageId = req.params.id
        const advertisementImage = await AdvertisementImage.findById(advertisementImageId).populate("Advertisement")
        return res.status(200).json(advertisementImage)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`failed to get advertisementImage`})
    }
}

const addAdvertisementImage = async function (req, res) {
    try {
        const{Content,Rank,Caption,Advertisement} = req.body
        const advertisementImage = await AdvertisementImage.create({Content,Rank,Caption,Advertisement})
        res.header("location",`${req.originalUrl}/${advertisementImage._id}`);
        return res.status(201).json(advertisementImage)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`failed to add AdvertisementImage`})
    }
}

const updateAdvertisementImage = async function (req, res) {
    try {
        const{Content,Rank,Caption,Advertisement} = req.body
        const advertisementImageId = req.params.id
        const updated = await AdvertisementImage.findByIdAndUpdate(advertisementImageId,{Content,Rank,Caption,Advertisement},{new:true})
        if (!updated) return res.status(404).json({message:`failed to update AdvertisementImage because it is not found`})
        return res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`failed to update AdvertisementImage`})
    }
}


const deleteAdvertisementImage = async function (req, res) {
    try {
        const advertisementImageId = req.params.id
        const deleted = await AdvertisementImage.findByIdAndDelete(advertisementImageId)
        if (!deleted) return res.status(404).json({message:`failed to delete AdvertisementImage because it is not found`})
        return res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`failed to delete AdvertisementImage`})
    }
}

module.exports = {getAdvertisementImages,getAdvertisementImage,addAdvertisementImage,updateAdvertisementImage,deleteAdvertisementImage}