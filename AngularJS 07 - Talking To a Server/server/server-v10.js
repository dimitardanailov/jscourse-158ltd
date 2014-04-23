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
/*
var connect_setup =
  // Load Connect
  connect()
    .use(require('compression')())
    .use(require('cookie-session')({
      keys: ['secret1', 'secret2']
    }))
    .use(require('errorhandler')())
    .use(require('body-parser')())
    .use(function(req, res, next) {
      console.log(req.body);
      res.end('Hello from Connect!\n');
      next();
    });
*/

app = 
  express()
    .set('port', process.env.PORT || 9000)
    // The route base is ../app
    .set('views', path.resolve(__dirname, '../app'))
    // Render html by just spitting the file out
    .set('view engine', 'html')
    .engine('html', function (path, options, fn) {
      if ('function' == typeof options) {
        fn = options, options = {};
      }
      fs.readFile(path, 'utf8', fn);
    })

// ========================
// API
// ========================
app
  // Get all contacts
  .get('/api/contacts', function (req, res, next) {
    Contact
      .find(null, {_id: 0})
      .sort("name.last")
      .exec(function(err, contacts) {
        if( err ) return res.send(500, err);
        if( !contacts ) return res.send(404, new Error("Contacts not found."));
        res.send(contacts);
      });
  })

  // Create a contact
  .post('/api/contact', function (req, res, next) {
    var contact = new Contact(req.body);
    contact.save(function (err, contact) {
      if( err ) return res.send(500, err);
      res.send(contact);
    });
  })

  // Get a single contact
  .get('/api/contact/:name', function (req, res, next) {
    Contact
      .findOne({ 'name.clean': req.params.name  }, { _id: 0 })
      .exec(function (err, contact) {
        // console.log(req.params);
        if( err ) return res.send(500, err);
        if( !contact ) return res.send(404, new Error("Contact not found."));
        res.send(contact);
      });
  })

  // Update a contact
  .post('/api/contact/:name', function (req, res, next) {
    Contact
      .findOne({ 'name.clean': req.params.name })
      .exec(function (err, contact) {
        if( err ) return res.send(500, err);
        if( !contact ) return res.send(404, new Error("Contact not found."));

        contact.name.first = req.body.name.first;
        contact.name.last = req.body.name.last;
        contact.email = req.body.email;
        contact.number = req.body.number;
        contact.notes = req.body.notes;
        contact.save(function (err, contact) {
          if( err ) return res.send(500, err);
          res.send(contact);
        });
      });
  });
// ========================
// API
// ========================

app
  // Point all requests at one file
  .get('*', function (req, res) {
    res.render('index.html', { layout: null });
  });

http.createServer(app).listen(app.get('port'), function(){
  console.log("Server listening on port " + app.get('port'));
});

