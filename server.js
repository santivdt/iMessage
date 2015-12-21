

var mongoose = require('mongoose');
var express  = require('express');
var app      = express();     // create our app w/ express //Create server http://stackoverflow.com/questions/18544815/mongoose-connect-method-fails-on-simple-node-server-express-mongoose-path
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

var db = mongoose.createConnection(
    'mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('success connection!');
});



app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will // be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(express.static('app'));

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");


// serve frontend met backend

app.get('*', function(req, res) {
    res.sendfile('app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


var collection = db.collection('messages');
//Create some users
var user1 = {name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']};
var user2 = {name: 'modulus user', age: 22, roles: ['user']};
var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};

// Insert some users
collection.insert([user1, user2, user3], function (err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
    }
    //Close connection
    db.close();
});




// define mongoose schema

var messageSchema = mongoose.Schema({
    text: String,
    fromMe: Number,
    date: String
});

// compiling schema into a model

var Message = mongoose.model('Message', messageSchema);


//construct new message

var bericht = new Message({ text: 'hoi daphne' });
console.log(bericht.text);

// routes ======================================================================

