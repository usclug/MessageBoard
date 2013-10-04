#!/usr/bin/env node
var express = require('express');
var mongo   = require('mongoskin');

var PORT = 5000;
var DB   = 'localhost:27017/msgdb'
var COLL = 'messages'

var app = express();
app.configure(function() {
  app.use(express.logger());                    // Logging middleware
  app.use(express.bodyParser());                // Used to parse body from post request
  app.use(express.static(__dirname+'/static'))  // Normally we would use a http server like Nginx to server static files but this is fine for now.
});

msgColl = mongo.db(DB, { safe: true }).collection(COLL)

app.get('/messages.json', function(req, res) {
  msgColl.find({}, { sort: { date: -1 }, limit: 20 }).toArray(function(err, items) {
    if(err) {
      return res.send(err);
    }

    res.json(items);
  });
});

app.post('/messages', function(req, res) {
  body = req.body;
  console.log(body);
  msg  = body.msg; date = body.date;


  if( msg && date ) {
    msg = {
      msg:  msg,
      date: +date
    } 

    msgColl.insert(msg, {}, function() {
      res.send("Inserted message!"); 
    });
  } else {
    res.send("Invalid message");
  }
});

app.listen(PORT, function() {
  console.log("Listening on " + PORT);
});
