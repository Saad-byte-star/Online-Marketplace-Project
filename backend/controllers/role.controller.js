const Role = require("../models/role.model")

const getRoles= async function (req, res) {
    try {
        const roles = await Role.find()
        return res.status(200).json(roles)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`failed to get roles`})
    }
}

const getRole= async function (req, res) {
    try {
        const roleId = req.params.id
        const role = await Role.findById(roleId)
        return res.status(200).json(role)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`failed to get roles`})
    }
}

const addRole = async function (req, res) {
    try {
        const{Name} = req.body
        const role = await Role.create({Name})
        res.header("location",`${req.originalUrl}/${role._id}`);
        return res.status(201).json(role)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`failed to add role`})
    }
}

const updateRole = async function (req, res) {
    try {
        const{Name} = req.body
        const roleId = req.params.id
        const updated = await Role.findByIdAndUpdate(roleId,{Name},{new:true})
        if (!updated) return res.status(404).json({message:`failed to update role because it is not found`})
        return res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`failed to update role`})
    }
}


const deleteRole = async function (req, res) {
    try {
        const roleId = req.params.id
        const deleted = await Role.findByIdAndDelete(roleId)
        if (!deleted) return res.status(404).json({message:`failed to delete role because it is not found`})
        return res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`failed to delete role`})
    }
}

module.exports = {getRoles,getRole,addRole,updateRole,deleteRole}