$(document).ready(function() {
  var feed = new Feed();


  $('aside h3').hover(showTooltip, hideTooltip);

  feed.loadSavedFeeds();

  $('.fetch').click(function(e) {
    e.preventDefault();
    var url = $('input').val();
    $('input').val('');
    feed.loadFeed(url, true);
  });

  feed.showSingleFeed();
});
