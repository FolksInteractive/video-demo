Template.videoModal.rendered = function() {
  $('.modal').on('shown.bs.modal', function() {
    var scrollContent = $('.comments-wrapper');
    var height = scrollContent[0].scrollHeight;
    scrollContent.scrollTop(height);
  });

  $('.modal').on('hidden.bs.modal', function () {
    player.pauseVideo();
  });
}