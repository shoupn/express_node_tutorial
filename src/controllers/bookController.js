const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');
const url = 'mongodb://localhost:27017';
const dbName = 'libraryApp';
const getBookById = require('../services/goodreadsService');
function bookController( nav) {
    function getIndex(req, res) {
        (async function mongo() {
          let client;
          try {
            client = await MongoClient.connect(url);
            debug('Connected correctly to server'); 

            const db = client.db(dbName);
            const col = await db.collection('books');
            const books = await col.find().toArray();

            res.render(
              'booksListView',
              {
                nav,
                title: 'Library',
                books
              }
            );
          } catch (err) {
            debug(err.stack);
          }
          client.close();
        }());
      }

    function getById(req, res){
        const { id } = req.params;
        (async function mongo(){
          let client;
          try {
            client = await MongoClient.connect(url);

            const db = client.db(dbName);
            const col = await db.collection('books');
            const book = await col.findOne({_id: new ObjectID(id)});
            book.details = await getBookById(book.bookId);
            res.render(
              'bookView',
              {
                nav,
                title: 'Library',
                book
              }
            );
          } catch (err) {
            debug(err.stack);
          }
          client.close();
        }());
      };

    return{getIndex, getById};
}

module.exports = bookController;