var express        = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require ('method-override');
global.path        = require('path');
global.mongoose    = require('mongoose');

var db_url = "mongodb://heroku_app27087961:q4vo2o3dgufb4h4a24ruh7bo1e@ds031988.mongolab.com:31988/heroku_app27087961" || 'mongodb://localhost/rssreader';
global.db          = mongoose.connect(db_url);

var app        = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

app.use(express.static(__dirname + '/public'));
var feedsController = require(path.join(__dirname, 'feedsController'));

app.get('/feeds', feedsController.index);
app.post('/feeds', feedsController.create);
app.get('/feeds/:id', feedsController.show);

var port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log('App is listening on port 8000');
})
