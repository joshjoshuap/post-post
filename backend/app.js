require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoute = require("./routes/user-route");

const app = express();

app.use(bodyParser.json()); // parsing json body data

app.use("/api/user", userRoute);

mongoose
  .connect(process.env.MONGODB_ATLAS_CONNECTION)
  .then(() => {
    app.listen(process.env.PORT || "5000", (req, res) => {
      console.log("Server Running");
    });
    console.log("Database Connected");
  })
  .catch((err) => console.log("Database Connection Failed", err));
