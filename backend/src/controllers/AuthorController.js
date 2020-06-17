const mongoose = require("mongoose");
const Author = mongoose.model("Author");

module.exports = {
  async index(request, response) {
    const authors = await Author.find();
    return response.json(authors);
  },

  async store(request, response) {
    const author = await Author.create(request.body);
    return response.json(author);
  },

  async show(request, response) {
    const author = await Author.findById(request.params.id);
    return response.json(author);
  },

  async update(request, response) {
    const author = await Author.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
      }
    );
    return response.json(author);
  },

  async destroy(request, response) {
    await Author.findByIdAndDelete(request.params.id);
    return response.send("success");
  },
};
