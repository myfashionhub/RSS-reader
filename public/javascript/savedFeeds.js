function displaySaved(data) {
  for (var i = 0; i < data.length; i++) {
    var feed = $('<a>').html(data[i].name)
                       .attr('href', '#'+data[i].name)
                       .attr('data-url', data[i].url);
    $('aside').append(feed);
  }

  $('aside').find('a').click(function(e) {
    var url = $(e.target).attr('data-url');
    console.log(e.target);
    loadFeed(url);
  });
}

$(document).ready(function() {
  $.ajax({
    url:     '/feeds',
    method:   'get',
    dataType: 'json',
    success: displaySaved
  })
});
