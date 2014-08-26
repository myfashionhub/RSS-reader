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
                       .attr('href', '#'+data[i]._id)
                       .attr('data-url', data[i].url);
    $('.saved-feeds').append(feed);
  }

  $('aside a').click(function(e) {
    var url = $(e.target).attr('data-url');
    loadFeed(url, false);
  });
}

function showTooltip() {
  var tooltip = $('<p>').addClass('tooltip')
                        .html("Click on feed to view content")
                        .appendTo($('aside h3'));
}

function hideTooltip() {
  $('.tooltip').remove();
}
