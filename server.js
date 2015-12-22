

var mongoose = require('mongoose');
var express  = require('express');
var app      = express();     // create our app w/ express //Create server http://stackoverflow.com/questions/18544815/mongoose-connect-method-fails-on-simple-node-server-express-mongoose-path
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


mongoose.connect( 'mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('success connection!');
});



//app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will // be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(express.static('app'));







// define mongoose schema

var messageSchema = mongoose.Schema({
    text: String,
    fromMe: Boolean,
    date: String
});

// compiling schema into a model

var Message = mongoose.model('Message', messageSchema);


//construct new message

var bericht = new Message({ text: 'hoi daphne' });
console.log(bericht.text);

// routes ======================================================================

// api ---------------------------------------------------------------------
var api = {};

api.messages = function (req, res) {
    console.log('-----> api')
    var page = parseInt(req.query.page),
        size = parseInt(req.query.size),
        skip = page > 0 ? ((page - 1) * size) : 0;

    var messagesObj = {
        totalItems: null,
        messages: null
    }
    var query = Message.find();

    var getMessagesCount = function() {
        return query
            .count(function (err, totalItems) {
                if (err) {
                    res.json(500, err);
                }
                else {
                    messagesObj.totalItems = totalItems;
                    getPaginatedMessages();
                }
            });
    };

    var getPaginatedMessages = function(){
        return query
            .skip(skip)
            .limit(size)
            .exec('find', function(err, messages) {
                if(err) {
                    res.json(500, err);
                }
                else {
                    messagesObj.messages = messages;
                    res.json(messagesObj);
                }
            });
    }

    getMessagesCount();
};

// get all messages
app.get('/api/messages', api.messages);


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");


// serve frontend met backend

app.get('/', function(req, res) {
    res.sendfile('app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
