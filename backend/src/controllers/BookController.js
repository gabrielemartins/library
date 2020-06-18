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
    const oldBook = await Book.findById(request.params.id);
    const book = await Book.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    });

    if (oldBook.author != book.author) {
      await Author.findByIdAndUpdate(oldBook.author, {
        $pull: { books: { $in: [book.id] } },
      });
      await Author.findByIdAndUpdate(book.author, {
        $push: { books: [book.id] },
      });
    }

    return response.json(book);
  },

  async updateFile(request, response) {
    const book = await Book.findByIdAndUpdate(
      request.params.id,
      {
        cover: {
          url: `${process.env.APP_URL}/files/${request.file.key}`,
          name: request.file.originalname,
          key: request.file.key,
        },
      },
      {
        new: true,
      },
      () => {
        console.log(request.file);
      }
    );
    return response.json(book);
  },

  async destroy(request, response) {
    const book = await Book.findById(request.params.id);
    await Author.findByIdAndUpdate(book.author, {
      $pull: { books: { $in: [book._id] } },
    });

    await Book.findByIdAndDelete(request.params.id);

    return response.json({ success: true });
  },
};
