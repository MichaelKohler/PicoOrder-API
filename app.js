(function () {
  'use strict';

  var globals = require('./globals');

  globals.db.open(function (err, db) {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to DB on port 27017.');
    }
  });

  var express = require('express');
  var server = express();

  server.configure(function () {
    server.set('port', 4444);
    server.set('publicfolder', 'public');
    server.use(express.bodyParser());
  });

  server.configure('development', function () {
    server.use(express.logger('dev'));
  });

  server.listen(server.get('port'), function () {
    console.log('Server started on Port ' + server.get('port'));
  });

  /** ROUTES **/
  var users = require('./routes/users.js');
  server.get('/api/users', users.listAll);
}());