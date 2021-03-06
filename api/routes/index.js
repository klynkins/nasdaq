var express = require("express");
var router = express.Router();

var ctrlStocks = require("../controllers/stocks.controllers.js");

router
    .route("/stocks")
    .get(ctrlStocks.stocksGetAll);
    
router
    .route("/stocks/:stockId")
    .get(ctrlStocks.stocksGetOne);  
    
router
    .route("/stocks/new")
    .post(ctrlStocks.stocksAddOne);

module.exports = router;