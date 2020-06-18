const mongoose = require("mongoose");
const Book = mongoose.model("Book");
const Author = mongoose.model("Author");

module.exports = {
  async index(request, response) {
    const books = await Book.find().populate("author");
    return response.json(books);
  },

  async store(request, response) {
    const { title, year, pages, summary, review, author } = request.body;

    const book = await Book.create({
      title,
      year,
      pages,
      summary,
      cover: {
        name: request.file.originalname,
        key: request.file.key,
        url: request.file.location,
      },
      review,
      author,
    });

    await Author.findByIdAndUpdate(author, { $push: { books: [book._id] } });
    return response.json(book);
  },

  async show(request, response) {
    const book = await Book.findById(request.params.id).populate("author");
    return response.json(book);
  },

  async update(request, response) {
    const book = await Book.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    });
    return response.json(book);
  },

  async updateFile(request, response) {
    const imgInfos = ({
      key,
      originalname: name,
      location: url,
    } = request.file);
    const cover = imgInfos;
    const book = await Book.findByIdAndUpdate(
      request.params.id,
      { cover: cover },
      {
        new: true,
      }
    );
    return response.json(book);
  },

  async destroy(request, response) {
    await Book.findByIdAndDelete(request.params.id);
    return response.send("success");
  },
};
