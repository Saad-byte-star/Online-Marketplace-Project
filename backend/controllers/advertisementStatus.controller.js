const AdvertisementStatus = require("../models/advertisementStatus.model")

const getStatuses= async function (req, res) {
    try {
        const status = await AdvertisementStatus.find()
        return res.status(200).json(status)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`failed to get status`})
    }
}

const getStatus= async function (req, res) {
    try {
        const statusId = req.params.id
        const status = await AdvertisementStatus.findById(statusId)
        return res.status(200).json(status)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`failed to get status`})
    }
}

const addStatus = async function (req, res) {
    try {
        const{Name} = req.body
        const status = await AdvertisementStatus.create({Name})
        res.header("location",`${req.originalUrl}/${status._id}`);
        return res.status(201).json(status)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`failed to add status`})
    }
}

const updateStatus = async function (req, res) {
    try {
        const{Name} = req.body
        const statusId = req.params.id
        const updated = await AdvertisementStatus.findByIdAndUpdate(statusId,{Name},{new:true})
        if (!updated) return res.status(404).json({message:`failed to update status because it is not found`})
        return res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`failed to update status`})
    }
}


const deleteStatus = async function (req, res) {
    try {
        const statusId = req.params.id
        const deleted = await AdvertisementStatus.findByIdAndDelete(statusId)
        if (!deleted) return res.status(404).json({message:`failed to delete status because it is not found`})
        return res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`failed to delete status`})
    }
}

module.exports = {getStatuses,getStatus,addStatus,updateStatus,deleteStatus}