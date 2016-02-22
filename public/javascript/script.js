function showTooltip() {
  var tooltip = $('<p>').addClass('tooltip')
                        .html("Click on feed to view content")
                        .appendTo($('aside h3'));
}


$(document).ready(function() {
  var feed = new Feed();

  $('aside h3').hover(
    function() { showTooltip(); },
    function() { $('.tooltip').remove(); }
  );
});
