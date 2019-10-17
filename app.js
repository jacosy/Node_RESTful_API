/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

const app = express();
//const bookRouter = express.Router();
const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoUri = 'mongodb+srv://chuyu:p@Ssw0rd@cluster-longo-l4asv.gcp.mongodb.net/bookAPI?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.listen(port, () => {
  console.log('Running on port: ' + port);
});