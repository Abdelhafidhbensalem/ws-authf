const express = require('express')
const cors = require('cors')
const app = express()
const product = require("./routes/routes_product")
require("dotenv").config()

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json())
app.use(cors())
const connectDb = require("./config/concetdb")
connectDb()
//routes
app.use("/product", product)
app.use("/user", require("./routes/userRoutes"))

const port = process.env.PORT || 5000
app.listen(5000, (err) => {
    err ? console.log(err) : console.log(`server is run http://localhost:${port}`)
})