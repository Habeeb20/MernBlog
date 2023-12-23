const authController = require('express').Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

authController.post("/register", async (req, res) => {
    try {
        const existingMail = await User.findOne({email: req.body.email})
        if(existingMail){
            throw new Error("email already exist")
        }
    
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        
        const newUser = await User.create({...req.body, password:hashedPassword})
        const {password, ...others} = newUser._doc

        const token = jwt.sign({id: newUser._id}, process.env.SECRET, {expiresIn: '3d'})

        res.status(201).json({user: others, token})
        
    } catch (error) {
        return res.status(404).json(error)
        
    }
   


})


authController.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user){
            throw new Error("wrong credentials")
        }
        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if(!comparePassword){
            throw new Error("invalid crendentials")
        }

        const {password, ...others} = user._doc
        const token = jwt.sign({id: checkMail._id}, process.env.SECRET, {expiresIn: "3h"})

        return res.status(201).json({user: others, token})
    } catch (error) {
        return res.status(500).json(error)
        
    }

})

module.exports = authController