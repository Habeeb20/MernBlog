const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authController = require("./controllers/authController")
const blogController = require("./controllers/blogController")
dotenv.config()
const app = express()
const multer = require("multer")
const port = process.env.PORT || 5000
mongoose.set("strictQuery", false)
mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("connected to database")
    })
    .catch((err) => {
        console.log(err)
    })

app.use('/images', express.static('public/images'))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use('/auth', authController)
app.use('/blog', blogController)

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images')
    },
    filename: function(req, file, cb){
        cb(null, req.body.filename)
    }
})

const upload = multer({
    storage: storage
})


app.post('/upload', upload.single("image"), async(req, res) => {
    return res.status(200).json({msg: "Successfully uploaded"})
})



app.listen(port,()=> {
    console.log(`server is listening on port ${port}`)
})
