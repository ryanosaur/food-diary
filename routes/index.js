var express = require('express');
var router = express.Router();
var data = require('../data.json');
var fs = require('fs');

var persistData = function(callbacks){
  fs.writeFile('./data.json', JSON.stringify(data), function(err){
    if(err){
      callbacks.error();
    }
    callbacks.success();
  });
}

router.get('/', function(req, res) {
  res.render('index', {});
});

router.delete('/quotes/:id', function(req, res) {
  var id = req.params.id;
  if(data.quotes[id]){
    data.quotes.splice(id, 1);
    persistData({
      success: function(){
        res.json({message: 'quoted deleted'});
      },
      error: function(){
        respone.status(400).json({message: 'quote was not deleted!'});
      }
    });
  }
  else{
    res.status(404).json({message: 'quote not found.'});
  }
});

router.get('/quotes', function(req, res) {
  res.json(data);
});

router.post('/quotes', function(req, res) {
  var quote = req.body.quote;
  if(!quote){
    res.status(400).json({error: 'yo, put in a quote.'});
    return;
  }

  if(data.quotes.indexOf(quote) > -1){
    res.status(400).json({error: 'dupe data'});
    return;
  }

  data.quotes.push(quote);
  persistData({
    success: function(){
      res.json({quote: quote});
    },
    error: function(){
      respone.status(500).send('GTFO, this didn\'t work. FIle system error or somehting.');
    }
  });
});

module.exports = router;
