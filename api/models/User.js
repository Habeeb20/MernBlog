const mongoose = require("mongoose")

const userBlogSchema = new mongoose.Schema({
    username:{
        type: String,
        requird: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
       
    },
}, {timestamps: true})


module.exports = mongoose.model("UserBlog", userBlogSchema)