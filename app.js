(function () {
    'use strict';

    var globals = require('./globals');

    var server = globals.restify.createServer();
    server.use(globals.restify.gzipResponse());
    server.use(globals.restify.bodyParser());
    server.listen(4444, function () {
        console.log('Server started on Port 4444');
    });

    /** ROUTES **/
    var users = require('./routes/users.js');
    server.post('/api/createUser', users.createUser);
}());