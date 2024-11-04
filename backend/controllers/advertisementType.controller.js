const AdvertisementType = require("../models/advertisementTypes.model")

const getAdvertisementTypes= async function (req, res) {
    try {
        const advertisementType = await AdvertisementType.find()
        return res.status(200).json(advertisementType)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`failed to get Advertisement Type`})
    }
}

const getAdvertisementType= async function (req, res) {
    try {
        const advertisementTypeId = req.params.id
        const advertisementType = await AdvertisementType.findById(advertisementTypeId)
        return res.status(200).json(advertisementType)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`failed to get advertisementTypes`})
    }
}

const addAdvertisementType = async function (req, res) {
    try {
        const{Name} = req.body
        const advertisementType = await AdvertisementType.create({Name})
        res.header("location",`${req.originalUrl}/${advertisementType._id}`);
        return res.status(201).json(advertisementType)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`failed to add Advertisement Type`})
    }
}

const updateAdvertisementType = async function (req, res) {
    try {
        const{Name} = req.body
        const advertisementTypeId = req.params.id
        const updated = await AdvertisementType.findByIdAndUpdate(advertisementTypeId,{Name},{new:true})
        if (!updated) return res.status(404).json({message:`failed to update Advertisement Type because it is not found`})
        return res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`failed to update Advertisement Type`})
    }
}


const deleteAdvertisementType = async function (req, res) {
    try {
        const advertisementTypeId = req.params.id
        const deleted = await AdvertisementType.findByIdAndDelete(advertisementTypeId)
        if (!deleted) return res.status(404).json({message:`failed to delete advertisementType because it is not found`})
        return res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`failed to delete advertisementType`})
    }
}

module.exports = {getAdvertisementTypes,getAdvertisementType,addAdvertisementType,updateAdvertisementType,deleteAdvertisementType}