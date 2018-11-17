const sql = require('mssql');
const express = require('express');
const debug = require('debug');
const bookRouter = express.Router();

function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      (async function query(){
        const request = new sql.Request();
        const { recordset } = await request.query('select * from books');
        res.render('booksListView', {
            nav,
            title: 'Library',
            books: recordset
        });
      }());
    });

  bookRouter.route('/:id')
    .all((req, res, next) => {
      const {
        id
      } = req.params;
      (async function query(){
        const request = new sql.Request();
        const {recordset} = 
          await request
          .input('id', sql.Int, id)
          .query(`select * from books where id = @id`);
        req.book = recordset[0];
        next();
      }());
    })
    .get((req, res) => {
      res.render('bookView', {
        nav,
        title: 'Library',
        book: req.book
    });
    });

  return bookRouter;
}

module.exports = router;
