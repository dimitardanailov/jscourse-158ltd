var path = require('path')
    , fs = require('fs')
    , http = require('http')
    , connect = require('connect')
    , mongooselib = require('mongoose')
    , express = require('express');

// ========================
// Database
// ========================
var database_name = 'angular-resources';
var mongoose = mongooselib
        .connect("mongodb://localhost:27017/" + database_name );
    db = mongoose.connection;

mongoose
  .set('debug', true);

// Database Logs info
var database_success_message = 
  "We have connected to - " + database_name;
db
  .on('error', console.error.bind(console, 'Connection Error.'))
  .once('open', console.log.bind(console, database_success_message));
// ========================
// Database
// ========================

// ========================
// Schemas
// ========================
var contactSchema = new mongoose.Schema({
  name: {
    first: { type: String, default: '' },
    last: { type: String, default: '' },
    clean: { type: String, default: '', unique: true }
  },
  email: { type: String, default: '' },
  number: { type: String, default: '' },
  notes: { type: String, default: '' },
  added: Date
});

contactSchema
  // Index on important fields
  .index({ name: { last: 1, clean: 1 }, email: 1 })
  // Make sure document has 'added' field when first saved
  .pre('save', function (next) {
    if( !this.added ) this.added = new Date();
    this.name.clean = (this.name.first + '-' + this.name.last).toLowerCase();
    next();
  });
// ========================
// Schemas
// ========================

// ========================
// Models
// ========================
var Contact = mongoose.model('Contact', contactSchema);
// ========================
// Models
// ========================

// Setup the Application
var app =
  // Load Connect
  connect()
    .use(require('compression')())
    .use(require('cookie-session')({
      keys: ['secret1', 'secret2']
    }))
    .use(require('body-parser')())
    .use(function(req, res, next) {
      console.log(req.body);
      res.end('Hello from Connect!\n');
      next();
    })
    // Load Express Module
    .use(require('express')())

// Set Env Port
var port = process.env.PORT || 9000;
var server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
});

