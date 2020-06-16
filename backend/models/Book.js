const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  year: {
    type: Number,
    required: true,
  },

  pages: {
    type: Number,
    required: true,
  },

  summary: String,

  cover: String,

  review: Number,

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
});
mongoose.model("Book", BookSchema);
