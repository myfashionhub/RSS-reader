var Schema = mongoose.Schema;
var FeedSchema = new Schema({
  name     : String,
  url      : String
});

module.exports = db.model('Feed', FeedSchema)
