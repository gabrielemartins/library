const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  birthday: Date,

  biography: String,

  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

mongoose.model("Author", AuthorSchema);
