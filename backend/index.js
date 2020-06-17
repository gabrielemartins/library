const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/library", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

requireDir("./src/models");

app.use("/library", require("./src/routes"));

app.listen(3333, () => {
  console.log("Server running at port 3333");
});
