
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/book', routes.book);
app.get('/partials/:name', routes.partials);

// JSON API
app.post('/api/requestBooking', api.requestBooking);
app.get('/api/getRooms', api.getRooms);
app.get('/api/people/all', api.getAllPeople);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
