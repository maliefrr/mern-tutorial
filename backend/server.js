const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const colors = require('colors');
const connectDB = require("./config/db");
const port = process.env.PORT || 3000;

connectDB()
const app = express();

// set middleware
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(errorHandler)

app.use("/api/goals",require("./routes/goalRoutes"))
app.use("/api/users",require("./routes/userRoutes"))

app.listen(port,() => {
    console.log(`app is running at port ${port}`
)});