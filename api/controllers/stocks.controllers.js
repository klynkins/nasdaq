var dbconn = require('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectID;

var stockData = require('../data/nasdaq.json');

module.exports.stocksGetAll = function(req, res) {

  var db = dbconn.get();

  // console.log("db", db);

  console.log('GET the stocks');
  console.log(req.query);

  var offset = 0;
  var count = 5;

  var collection = db.collection('nasdaq');

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  
  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  collection
    .find()
    .skip(offset)
    .limit(count)
    .toArray(function(err, docs) {
      console.log("Found stocks", docs.length);
      res
        .status(200)
        .json(docs);
  });

};

module.exports.stocksGetOne = function(req, res) {
  var db = dbconn.get();
  var id = req.params.stockId;
  var collection = db.collection('nasdaq');
  console.log('GET stockId', id);

  collection
    .findOne({
      _id : ObjectId(id)
    }, function(err, doc) {
      res
        .status(200)
        .json(doc);
  });

};

module.exports.stocksAddOne = function(req, res) {
  console.log("POST new stock");
  var db = dbconn.get();
  var collection = db.collection('nasdaq');
  var newStock;

  if (req.body && req.body.name && req.body.stars) {
    newStock = req.body;
    newStock.stars = parseInt(req.body.stars, 10);
    collection.insertOne(newStock, function(err, response) {
      console.log("Stock added", response);
      console.log("Stock added", response.ops);
      res
        .status(201)
        .json(response.ops);
    });
  } else {
    console.log("Data missing from body");
    res
      .status(400)
      .json({ message : "Required data missing from body" });
  }

};