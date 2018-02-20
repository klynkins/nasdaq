var stockData = require("../data/companylist.csv");

module.exports.stocksGetAll = function(req, res) {
    console.log("GET the stocks");
    console.log(req.query);
    
    var offset = 0; /* starting point of slice*/
    var count = 5; /* end point of slice*/
    
    if (req.query && req.query.offset) {
      offset = parseInt(req.query.offset, 10);  
    };
    
    if (req.query && req.query.count) {
      count = parseInt(req.query.count, 10);  
    };
    
    var returnData = stockData.slice(offset, offset + count);
    
      res
        .status(200)
        .json( stockData );
};

module.exports.stocksGetOne = function(req, res) {
    var stockId = req.params.stockId;
    var thisStock = stockData[stockId];
    console.log("GET stockId", stockId);
    res
        .status(200)
        .json( thisStock );
};

module.exports.stocksAddOne = function (req, res) {
   console.log("POST new stock");
   console.log(req.body);
   res
   .status(200)
   .json(req.body);
};