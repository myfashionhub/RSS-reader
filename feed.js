app.get('/', function(req, res) {
  var bookshelf = app.get('bookshelf');
  var Author = bookshelf.Model.extend({
    tableName: 'authors'
  });
  Author.fetchAll({}).then(function(collection) {
    res.send(collection);
  });
});

app.get('/authors/:id', function(req, res) {
  var bookshelf = app.get('bookshelf');
  var Book = bookshelf.Model.extend({
    tableName: 'books'
  });
  var book = Book.where({author_id: req.params.id}).fetch().then(function(collection) {
    res.send(collection);
  });
});
