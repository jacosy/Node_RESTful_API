/* eslint-disable no-param-reassign */
const express = require('express');
const bookController = require('../controllers/bookController')

function routes(Book) {
  const bookRouter = express.Router();
  const controller = bookController(Book);

  bookRouter.route('/books')
    .post(controller.post)
    .get(controller.get);

  // Middleware
  bookRouter.use('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err === null) {
        if (book === null) {
          return res.sendStatus(404);
        }
        req.book = book;
        return next();
      }
      return res.send(err);
    });
  });

  bookRouter.route('/books/:bookId')
    .get((req, res) => {
      let returnBook = req.book.toJSON();
      returnBook.links = {
        filterByThisGenre: `http://${req.headers.host}/api/books/?genre=${returnBook.genre.replace(' ', '%20')}`
      }
      res.json(returnBook);
    })
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      book.save(err => {
        if (err === null) {
          return res.json(book);
        }
        return res.status(500).send(err);
      });
    })
    .patch((req, res) => {
      const { book } = req;
      if (req.body._id !== undefined) {
        delete req.body._id;
      }
      Object.entries(req.body).forEach(item => {
        book[item[0]] = item[1];
      });
      book.save(err => {
        if (err === null) {
          return res.json(book);
        }
        return res.status(500).send(err);
      });
    })
    .delete((req, res) => {
      req.book.remove(err => {
        if (err === null) {
          return res.sendStatus(204);
        }
        return res.status(500).send(err);
      });
    });

  return bookRouter;
}

module.exports = routes;