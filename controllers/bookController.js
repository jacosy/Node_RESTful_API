
function bookController(Book) {
  function post(req, res) {
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
  }

  function get(req, res) {
    const query = {};
    if (req.query.genre !== undefined) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err === null) {
        const returnBooks = books.map(book => {
          let returnBook = book.toJSON();
          returnBook.links = {
            self: `http://${req.headers.host}/api/books/${book._id}`
          };          
          return returnBook;
        })
        return res.json(returnBooks);
      }
      return res.send(err);
    });
  }

  return { get, post };
}

module.exports = bookController;