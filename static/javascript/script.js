function rssFeed() {
  var feed_urls = $('.rss.feed').children();
  for (var i = 0; i < feed_urls.length; i++) {
    url = $(feed_urls[i]).attr('data-feed');
    loadFeed(url);
  }
}

function loadFeed(url) {
  var feed = new google.feeds.Feed(url);
  feed.setNumEntries(3);
  feed.load(function(data){
    displayFeedArticle(data);
  });
}

function displayFeedArticle(data) {
  for (var i = 0; i < data.feed.entries.length; i++) {
    var entry    = data.feed.entries[i];
    var $article = $('<div>').addClass('article');
    var $date    = $('<div>').addClass('date')
                             .append(new Date(entry.publishedDate));
    var $url     = $('<a>').attr('href', entry.link);
    var $title   = $('<h3>').addClass('title')
                            .html(entry.title);
    var $extract = $('<p>').addClass('extract')
                           .html(entry.content);

    if ($url.attr('href').indexOf('nytimes') > -1 ||
        $url.attr('href').indexOf('guardian') > -1) {
      $extract.html($extract.contents().first());
    }

    var $publisher = $('<p>').addClass('publisher')
                            .attr('data', data.feed.title)
                            .html('Published by: '+data.feed.title);
    $title.wrapInner($url);
    $article.append($title)
            .append($extract)
            .append($publisher)
            .append(generateButtons());
    $('.rss').append($article);
  }

  $('.rss .save-article').on('click', function(e) {
    articleAction('.save-article', e);
  });

  $('.rss .discard-article').on('click', function(e) {
    articleAction('.discard-article', e);
  });
}
