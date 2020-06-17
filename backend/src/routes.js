const express = require("express");
const routes = express.Router();
const AuthorController = require("./controllers/AuthorController");
const BookController = require("./controllers/BookController");
const multer = require("multer");
const multerConfig = require("./config/multer");

upload = multer(multerConfig);

routes.get("/books", BookController.index);
routes.get("/book/:id", BookController.show);
routes.post("/create-book", upload.single("file"), BookController.store);
routes.put("/update-book/:id", BookController.update);
routes.delete("/delete-book/:id", BookController.destroy);

routes.get("/authors", AuthorController.index);
routes.get("/author/:id", AuthorController.show);
routes.post("/create-author", AuthorController.store);
routes.put("/update-author/:id", AuthorController.update);
routes.delete("/delete-author/:id", AuthorController.destroy);

module.exports = routes;
