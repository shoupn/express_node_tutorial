const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');
const url = 'mongodb://localhost:27017';
const dbName = 'libraryApp';


function authController(nav) {

    function signUp (req, res) {
        const { username, password } = req.body;
        (async function addUser() {
          let client;
          try {
            client = await MongoClient.connect(url);
            debug('Connected correctly to server');
  
            const db = client.db(dbName);
  
            const col = db.collection('users');
            const user = { username, password };
            const results = await col.insertOne(user);
            debug(results);
            req.login(results.ops[0], () => {
              res.redirect('/auth/profile');
            });
          } catch (err) {
            debug(err);
          }
        }());
      };

      function getSignin (req, res) {
            res.render('signin', {
              nav,
              title: 'Sign In'
            });
      };

      function profileAll(req, res, next) {
            if (req.user) {
              next();
            } else {
              res.redirect('/');
            }
      };

      function userProfile(req, res) {
            res.json(req.user);
      };

    return{ signUp, getSignin, profileAll, userProfile };
};

module.exports = authController;