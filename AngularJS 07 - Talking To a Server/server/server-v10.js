var path = require('path')
    , fs = require('fs')
    , http = require('http')
    , connect = require('connect')
    , express = require('express');

// Setup the server
var app =
  // Load Connect
  connect()
    .use(require('compression')())
    .use(require('cookie-session')({
      keys: ['secret1', 'secret2']
    }))
    .use(require('body-parser')())
    .use(function(req, res) {
      res.end('Hello from Connect!\n');
    })
    // Load Express Module
    .use(require('express')())

// Set Env Port
var port = process.env.PORT || 9000;
var server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
});

