$(document).ready(function() {
  loadArchives();
  $('aside h3').hover(showTooltip, hideTooltip);

  $('.fetch').click(function(e) {
    e.preventDefault();
    var url = $('input').val();
    $('input').val('');
    loadFeed(url);
  });

  rememberFeed();
});
