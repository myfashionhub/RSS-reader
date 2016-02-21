function Feed() {
  var that = this;

  this.init = function() {

    this.loadSavedFeeds();
    this.showSingleFeed();

    $('.get-feed').submit(function(e) {
      e.preventDefault();
      var url = $('.get-feed input').val();
      $('.get-feed input').val('');
      that.loadFeed(url, true);
    });

  };

  this.loadFeed = function(url, showSave) {
    var feed = new google.feeds.Feed(url);
    feed.setNumEntries(10);

    feed.load(function(data) {
      that.populateFeedHeading(data, url, showSave);
      that.populateFeedPosts(data);
    });
  };

  this.populateFeedHeading = function(data, url, showSave) {
    $('.feed-info').empty();
    var name     = $('<a>').html(data.feed.title).addClass('title')
                           .attr('href', url).attr('target', '_blank');
    $('.feed-info').append(name);
    console.log('Show save', showSave)
    if (showSave === true) {
      var save     = $('<button>').html('Save this!').addClass('save-feed');
      $('.feed-info').append(save);
    }

    $('.save-feed').click(function() { that.saveFeed(); });
  };

  this.populateFeedPosts = function(data) {
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
  };

  this.saveFeed = function() {
    var name = $('.feed-info').find('a').html();
    var url  = $('.feed-info').find('a').attr('href');

    $.ajax({
      url:      '/feeds',
      method:   'post',
      data:     { name: name, url: url },
      dataType: 'json',
      success: function() { that.loadSavedFeeds(); }
      // Append new feed to sidebar after saving
    });  
  };

  this.loadSavedFeeds = function() {
    $.ajax({
      url:     '/feeds',
      method:   'get',
      dataType: 'json',
      success: function(data) {
        that.populateSavedFeeds(data);
      }
    });
  };

  this.populateSavedFeeds = function(data) {
    $('.saved-feeds').empty();
    for (var i = 0; i < data.length; i++) {
      var feed = $('<a>').html(data[i].name)
                         .attr('href', '#'+data[i]._id)
                         .attr('data-url', data[i].url);
      $('.saved-feeds').append(feed);
    }

    $('aside a').click(function(e) {
      var url = $(e.target).attr('data-url');
      that.loadFeed(url, false);
    });
  };

  this.showSingleFeed = function() {
    var id = location.hash;
    id     = id.slice(1, id.length);

    if (id != '') {
      $.ajax({
        url: '/feeds/'+id,
        method: 'get',
        dataType: 'json',
        success: function(data) {
          that.loadFeed(data.url, false);
      },
        error: function(err) { console.log(err); }
      });
    }
  };

  this.init();
}


function showTooltip() {
  var tooltip = $('<p>').addClass('tooltip')
                        .html("Click on feed to view content")
                        .appendTo($('aside h3'));
}

function hideTooltip() {
  $('.tooltip').remove();
}
