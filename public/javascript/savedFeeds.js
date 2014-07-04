function loadArchives() {
  $.ajax({
    url:     '/feeds',
    method:   'get',
    dataType: 'json',
    success: function(data) {
      displaySaved(data);
    }
  });
}

function displaySaved(data) {
  $('.saved-feeds').empty();
  for (var i = 0; i < data.length; i++) {
    var feed = $('<a>').html(data[i].name)
                       .attr('href', '#'+data[i].name)
                       .attr('data-url', data[i].url);
    $('.saved-feeds').append(feed);
  }

  $('aside').find('a').click(function(e) {
    var url = $(e.target).attr('data-url');
    var feed = new google.feeds.Feed(url);
      feed.setNumEntries(10);
      feed.load(function(data) {
        displayFeed(data)
        $('.feed-info').html('<h2>'+data.feed.title+'</h23>');
      });
  });
}

function savedInfo() {
  var tooltip = $('<p>').addClass('tooltip')
                        .html("Click on feed to view content")
                        .appendTo($('aside h3'));
}

function removeInfo() {
  $('.tooltip').remove();
}

$(document).ready(function() {
  loadArchives();
  $('aside h3').hover(savedInfo, removeInfo);
});
