function loadFeed(url) {
  var feed = new google.feeds.Feed(url);
  feed.setNumEntries(8);
  feed.load(function(data) {
    feedInfo(data, url);
    displayFeed(data);
  });
}

function feedInfo(data, url) {
  $('.feed-info').empty();
  var name     = $('<a>').html(data.feed.title)
                         .attr('href', url)
                         .attr('target', '_blank');
  var save     = $('<button>').html('Save this!').addClass('save-feed');
  $('.feed-info').append(name).append(save);
}

function displayFeed(data) {
  $('.content').empty();
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
    $.ajax({
      url:      '/feeds',
      method:   'post',
      data:     { name: name, url: url },
      dataType: 'json',
      success: function(data) {
        loadArchives(data);
        console.log('Adding saved feed');
      }
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
