const mongoose = require("mongoose");
const Book = mongoose.model("Book");

module.exports = {
  async index(request, response) {
    const books = await Book.find();
    return response.json(books);
  },

  async store(request, response) {
    const book = await Book.create(request.body);
    return response.json(book);
  },

  async show(request, response) {
    const book = await Book.findById(request.params.id);
    return response.json(book);
  },

  async update(request, response) {
    const book = await Book.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    });
    return response.json(book);
  },

  async destroy(request, response) {
    await Book.findByIdAndDelete(request.params.id);
    return response.send("success");
  },
};
