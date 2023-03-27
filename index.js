const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
// const DBConnect = require("./utils/dbConnect");

const app = require("./app");

// database connection
// DBConnect();

mongoose.connect('mongodb+srv://mdismail645221:NkHyY3ommZFXKOb2@cluster0.yzc4fwf.mongodb.net/?retryWrites=true&w=majority').then(()=> {
  console.log(`database connection successful `)
})

// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});

