// require module that we will use in our app
var express	= require('express'),
	bodyParser = require('body-parser'),
	routes = require('./routes/routes'),
	mongoose = require('mongoose'),
	config = require('./config/development'),
	session = require('express-session'),
	app = express();

var sess;
// making connection to mongodb using mongoose
mongoose.connect(config.mongodb, function(err) {
    if (err) throw err;
});
// set the secret key it can be anything
app.use(session({secret: 'ssshhhhh'}));
// use body-parser middleware for reading body of every request
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
// specify the public folder
app.use(express.static('public'));
// register html as templating language
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//routes
app.use('/',routes);
// starting server at 3000  
var server = app.listen(config.port,function(){
	console.log("Server started at :"+server.address().port);
});
