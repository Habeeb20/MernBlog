const blogController = require('express').Router()
const Blog= require("../models/Blog")
const verifyToken = require('../middlewares/verifyToken')


blogController.get('/getAll', async(req, res) => {
    try {
        const blogs = await Blog.find({}).populate("userId", '-password')
        return res.status(200).json(blogs)
    } catch (error) {
        return res.status(404).json(error)
        
    }
})

blogController.get('/find/:id', async(req, res) => {
    try {
        const blog = await Blog.findOne(req.params.id).populate("userId", '-password')
        blog.views +=1
        await blog.save()
        return res.status(200).json(blog)
    } catch (error) {
        return res.status(500).json(error)
        
    }
})

blogController.get("/featured", async(req, res) => {
    try {
        const blogs = await Blog.find({featured: true}).populate("userId", 'password').limit(3)
        return res.status(200).json(blogs)
    } catch (error) {
        return res.status(500).json(error)
    }
})

blogController.post('/', verifyToken, async(req, res) => {
    try {
        const blog = await Blog.create({...req.body, userId: req.user.id})
        return res.status(201).json(blog)
    } catch (error) {
        return res.status(500).json(error)
        
    }
})

blogController.put("/updateBlog/:id", verifyToken, async(req, res) => {
    try{
        const blog = await Blog.findById(req.params.id)
        if(blog.userId !== req.user.id){
            throw new Error("you can only update your post")

        }

        const updateBlog = await Blog.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).populate('userId', '-password')
        return res.status(200).json(updateBlog)
        
    } catch (error) {
        return res.status(500).json(error)

    }
})