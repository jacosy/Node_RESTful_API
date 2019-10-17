/* eslint-disable no-param-reassign */
const express = require('express');

function routes(Book) {
  const bookRouter = express.Router();
  bookRouter.route('/books')
    .post((req, res) => {
      const book = new Book(req.body);
      book.save((err, book) => {
        if (err === null) {
          return res.status(201).json({
            success: true,
            message: `The newly created book ID is: ${book.id}`
          });
        }
        return res.json({
          success: false,
          message: err
        });
      });
    })
    .get((req, res) => {
      const query = {};
      if (req.query.genre !== undefined) {
        query.genre = req.query.genre;
      }
      Book.find(query, (err, books) => {
        if (err === null) {
          //console.log(books);
          return res.json(books);
        }
        return res.send(err);
      });
    });

  bookRouter.route('/books/:bookId')
    .get((req, res) => {
      Book.findById(req.params.bookId, (err, book) => {
        if (err === null) {
          return res.json(book);
        }
        return res.send(err);
      });
    })
    .put((req, res) => {
      Book.findById(req.params.bookId, (err, book) => {
        if (err === null) {
          book.title= req.body.title;
          book.author= req.body.author;
          book.genre= req.body.genre;
          book.read= req.body.read;
          book.save();
          return res.json(book);
        }
        return res.send(err);
      });
    });

  return bookRouter;
}

module.exports = routes;