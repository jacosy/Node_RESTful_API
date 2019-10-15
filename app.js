/* eslint-disable no-undef */
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bookRouter = express.Router();
const port = process.env.port || 3000;

const mongoUri = 'mongodb+srv://chuyu:p@Ssw0rd@cluster-longo-l4asv.gcp.mongodb.net/bookAPI?retryWrites=true&w=majority';
const db = mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const Book = require('./models/bookModel');

bookRouter.route('/books')
  .get((req, res) => {
    Book.find((err, books) => {      
      if (err === null) {
        //console.log(books);
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