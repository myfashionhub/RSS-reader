var Feed = require(path.join(__dirname, 'feed'));

exports.index = function(req, res) {
  Feed.find(function(err, feeds) {
    if (err) return console.log(err);
    res.send(feeds);
  })
}

exports.create = function(req, res) {
  var feed = Feed.create({
    name: req.body.name,
    url : req.body.url
  }, function(err, feed) {
    if (err) return console.log(err);
    res.send(feed);
  });
  feed.save(function(err) {
    if (err && (err.code === 1100 || err.code === 11001) {
      res.send('Feed already saved');
    }
  });
}

exports.show = function(req, res) {
  Feed.findById(req.params.id, function(err, feed) {
    if (err) return console.log(err);
    res.send(feed);
  })
}
