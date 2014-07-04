var express        = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require ('method-override');
global.path        = require('path');
global.mongoose    = require('mongoose');
global.db          = mongoose.connect('mongodb://localhost/rssreader');

var app        = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

app.use(express.static(__dirname + '/public'));
var feedsController = require(path.join(__dirname, 'feedsController'));

app.get('/feeds', feedsController.index);
app.post('/feeds', feedsController.create);
app.get('/feeds/:id', feedsController.show);

app.listen(process.env.PORT, function() {
  console.log('App is listening on port 8000');
})
