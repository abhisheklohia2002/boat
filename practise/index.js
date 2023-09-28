const express = require("express");
const app = express()
const cors = require("cors");
const mongoose = require("mongoose")
const Router = require("./routes/route")
app.use(express.json())
app.use(cors())
app.use("/api",Router)
mongoose.connect(`mongodb+srv://king:king@cluster0.addnvdz.mongodb.net/boatregister?retryWrites=true&w=majority`,{
    useNewUrlParser: true
}).then((res)=>console.log("db is connected ")).catch((err)=>console.log(err))

app.listen(5000,()=>console.log("server is ready"))