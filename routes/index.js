var express = require('express');
var router = express.Router();
var data = require('../data.json');
var fs = require('fs');

router.get('/', function(req, res) {
  res.render('index', {});
});

router.get('/data/:id', function(req, res) {
  var data = require("../data.json");
  res.send(data.quotes[+req.params.id - 1]);
});

router.get('/quotes', function(req, res) {
  res.json(data);
});

router.post('/quotes', function(req, res) {
  var body = req.body;
  console.log(body);
  data.quotes.push(body.quote);

  fs.writeFile('./data.json', JSON.stringify(data), function(err){
    if(err){
      console.log(err);
      respone.status(500).send('GTFO, this didn\'t work. FIle system error or somehting.');
    }
    res.json(data);
  });
});

module.exports = router;
