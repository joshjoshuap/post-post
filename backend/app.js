const express = require("express");

const app = express();

app.get("/", (req, res, next) => {
  res.send("Test");
});

app.listen("5000", (req, res) => {
  console.log("Server Running");
});
