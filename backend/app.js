require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Routing
const userRoute = require("./routes/user-route");

// Intialize
const app = express();

// Configuration
app.use(bodyParser.json()); // parsing json body data
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    `${process.env.ALLOW_ORIGIN_URL}`
  ); // cors access
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
}); // cors, headers configruation

app.use("/api/user", userRoute);

// Error Handling
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unkown error occured" });
});

// Database Connection, Server
mongoose
  .connect(process.env.MONGODB_ATLAS_CONNECTION)
  .then(() => {
    app.listen(process.env.PORT || "5000", (req, res) => {
      console.log("Server Running");
    });
    console.log("Database Connected");
  })
  .catch((err) => console.log("Database Connection Failed", err));
