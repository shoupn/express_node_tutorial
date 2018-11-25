const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodReadService');
const parser = xml2js.Parser({ explicitArray: false });
module.exports = function getBookById(bookId) {
  return new Promise((resolve, reject) => {
    axios.get( `https://www.goodreads.com/book/show/${bookId}?format=xml&key=URQ7KDHFBTEqNEH12NnMlQ`)
      .then((res) => {
        parser.parseString(res.data, (err, result) => {
          if (err) { debug(err)}
          else { 
            debug(result);
            resolve(result.GoodreadsResponse.book);
          }
        });
      })
      .catch((err) => {
        reject(err);
        debug(err);
      });
  })
};