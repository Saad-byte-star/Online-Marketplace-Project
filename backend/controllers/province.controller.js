const Province = require("../models/province.model")


const getAllProvince = async (req, res) => {
    try {
        
        const provinces = await Province.find().populate("Country")
       return res.status(200).json(provinces)
    } catch (error) {
        console.log(error);
      return  res.status(400).json({message : "Failed to get provinces"})
       
    }
}

const getProvince = async (req, res) => {
    try {
        const provinceId = req.params.id
        const province = await Province.findById(provinceId).populate("Country")
       return res.status(200).json(province)
    } catch (error) {
        console.log(error);
       return res.status(400).json({message : "Failed to get province"})
        
    }
}

const addProvince = async (req, res) => {
    try {
       const {Name, Country} = req.body
       const provinceAdded = await Province.create({Name,Country})
       res.header("location",`${req.originalUrl}/${provinceAdded._id}`);
       return res.status(201).json(provinceAdded)

    } catch (error) {
        console.log(error);
       return res.status(400).json({message: "Failed to add province"})
        
    }
}

const updateProvince = async (req, res) => {
    try {
        const provinceId = req.params.id
        const {Name,Country} = req.body
        const province = await Province.findByIdAndUpdate(provinceId,{Name,Country},{new:true})

        if (!province) return res.status(404).json({message : "Province not found"})

        return res.status(200).json(province)
    } catch (error) {
        console.log(error);
       return res.status(400).json({message : "Failed to update province"})
        
    }
}

const deleteProvince = async (req, res) => {
    try {
        const provinceId = req.params.id
        const province = await Province.findByIdAndDelete(provinceId)

        if (!province) return res.status(404).json({message : "Province not found"})

       return res.status(200).json(province)

    } catch (error) {
        console.log(error);
       return res.status(400).json({message : "Failed to delete province"})
        
    }
}

module.exports = {getAllProvince, getProvince, addProvince, updateProvince, deleteProvince }