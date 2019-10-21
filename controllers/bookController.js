
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
        //console.log(books);
        return res.json(books);
      }
      return res.send(err);
    });
  }

  return { get, post };
}

module.exports = bookController;