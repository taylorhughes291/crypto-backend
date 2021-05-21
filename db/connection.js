require("dotenv").config()
const mongoose = require("mongoose")

const {MONGODBURI} = process.env

mongoose.connect(MONGODBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("open", () => console.log("connected to Mongo"))
.on("close", () => console.log("disconnected to Mongo"))
.on("error", (error) => console.log(error))

module.exports = mongoose