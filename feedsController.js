var Feed = require(path.join(__dirname, 'feed'));

exports.index = function(req, res) {
  Feed.find(function(err, feeds) {
    if (err) return console.log(err);
    res.send(feeds);
  })
}

exports.create = function(req, res) {
  Feed.create({
    name: req.body.name,
    url : req.body.url
  }, function(err, feed) {
    if (err) return console.log(err);
    console.log(feed);
    //res.send(feed);
  });
}

exports.show = function(req, res) {
  Feed.findById(req.params.id, function(err, feed) {
    if (err) return console.log(err);
    res.send(feed);
  })
}
