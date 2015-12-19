/**
 * Created by Santi on 16/12/15.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/27017/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    // yay!
});

var express  = require('express');
var app      = express();                               // create our app w/ express //Create server http://stackoverflow.com/questions/18544815/mongoose-connect-method-fails-on-simple-node-server-express-mongoose-path
                   // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


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


// define mongoose schema

var messageSchema = mongoose.Schema({
    text: String,
    fromMe: Number,
    date: String
});

// compiling schema into a model

var Message = mongoose.model('Message', messageSchema);

// data

data = [
    {
        "text": "hahahhaha",
        "fromMe": 1,
        "date": "Thu Dec 03 2015 14:50:07 GMT+0100 (CET)"
    },
    {
        "text": "tis een sketch bestand dus zal t nooit kunnen zien.",
        "fromMe": 1,
        "date": "Thu Dec 03 2015 14:50:21 GMT+0100 (CET)"
    },
    {
        "text": "ik kan na de twee weken dat ik je ken al 1000 dingen noemen waar je beter in bent.",
        "fromMe": 1,
        "date": "Thu Dec 03 2015 14:51:46 GMT+0100 (CET)"
    }
]



//construct new message

var bericht = new Message({ text: 'hoi daphne' });
console.log(bericht.text);