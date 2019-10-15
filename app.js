/* eslint-disable no-undef */
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bookRouter = express.Router();
const port = process.env.port || 3000;

const mongoUri = 'mongodb+srv://chuyu:p@Ssw0rd@cluster-longo-l4asv.gcp.mongodb.net/bookAPI?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const Book = require('./models/bookModel');

bookRouter.route('/books')
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
    Book.findById(req.params.bookId, (err, books) => {
      if (err === null) {
        return res.json(books);
      }
      return res.send(err);
    });
  });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.listen(port, () => {
  console.log('Running on port: ' + port);
});