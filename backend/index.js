require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

requireDir("./src/models");

//Route for access the local files
app.use("/files", express.static(path.resolve(__dirname, "tmp", "uploads")));

app.use("/library", require("./src/routes"));

app.listen(3333, () => {
  console.log("Server running at port 3333");
});
