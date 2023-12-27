const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authController = require("./controllers/authController")
const blogController = require("./controllers/blogController")
dotenv.config()
const app = express()
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


app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use('/auth', authController)
app.use('/blog', blogController)


app.listen(port,()=> {
    console.log(`server is listening on port ${port}`)
})
