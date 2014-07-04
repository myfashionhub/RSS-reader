var express    = require('express');
var bodyParser = require('body-parser');
var path       = require('path');
var mongoose   = require('mongoose');
var db = mongoose.connect('mongodb://localhost/rssreader');

var app        = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/static'));

var Schema = mongoose.Schema;
var FeedSchema = new Schema({
  name     : String,
  url      : String
});

module.exports = db.model('Feed', MonkeySchema)
