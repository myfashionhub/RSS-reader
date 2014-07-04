function loadFeed(url) {

  var feed = new google.feeds.Feed(url);
  feed.setNumEntries(1);
  feed.load(displayFeedArticle);
}

function displayFeedArticle(data) {
  var name     = $('<span>').html(data.feed.title);
  var save     = $('<button>').html('Save feed')
  var feedInfo = $('<div>').addClass('feed-info')
                  .append(name).append(save);
  $('.content').append(feedInfo);

  var entries = data.feed.entries;
  for (var i = 0; i < entries.length; i++) {
    var article = $('<article>');
    var title   = $('<h3>').html(entries[i].title);
    var link    = $('<a>').attr('href', entries[i].link);
    title.wrapInner(link);
    var content = $('<p>').html(entries[i].content)
    article.append(title).append(content);
    $('.content').append(article);
  }
}

$(document).ready(function() {
  $('.fetch').click(function(e) {
    e.preventDefault();
    var url = $('input').val();
    $('input').val('');
    loadFeed(url);
  });
})
