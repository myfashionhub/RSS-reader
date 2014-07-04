function loadFeed(url) {
  var feed = new google.feeds.Feed(url);
  feed.setNumEntries(1);
  feed.load(function(data) { displayFeedArticle(data, url) });
}

function displayFeedArticle(data, url) {
  var name     = $('<a>').html(data.feed.title)
                         .attr('href', url);
  var save     = $('<button>').html('Save feed').addClass('save-feed');
  var feedInfo = $('<div>').addClass('feed-info')
                  .append(name).append(save);
  $('.content').append(feedInfo);

  var entries = data.feed.entries;
  for (var i = 0; i < entries.length; i++) {
    var article = $('<article>');
    var title   = $('<p>').html(entries[i].title);
    var link    = $('<a>').attr('href', entries[i].link);
    title.wrapInner(link);
    var content = $('<p>').html(entries[i].content)
    article.append(title).append(content);
    $('.content').append(article);
  }

  saveFeed();
}

function saveFeed() {
  $('.save-feed').click(function() {
    var name = $('.feed-info').find('a').html();
    var url  = $('.feed-info').find('a').attr('href');
    console.log('ajaxing');
    $.ajax({
      url:      '/feeds',
      method:   'post',
      data:     { name: name, url: url },
      dataType: 'json',
      success: function() { }
    });
  });
}

$(document).ready(function() {
  $('.fetch').click(function(e) {
    e.preventDefault();
    var url = $('input').val();
    $('input').val('');
    loadFeed(url);
  });

});
