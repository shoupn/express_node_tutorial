const express = require('express');

const bookRouter = express.Router();

function router(nav) {
  const books = [{
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Tolstoy',
    read: false
  },
  {
    title: 'Les Miserables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    read: false
  },
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    read: true
  },
  {
    title: 'Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    read: true
  }
  ];

  bookRouter.route('/')
    .get((req, res) => {
      res.render('booksListView', {
        nav,
        title: 'Library',
        books
      });
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const {
        id
      } = req.params;
      res.render('bookView', {
        nav,
        title: 'Library',
        book: books[id]
      });
    });

  return bookRouter;
}

module.exports = router;
