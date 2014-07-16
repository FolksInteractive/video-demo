Template.videoModal.rendered = function() {
  $('.modal').on('hidden.bs.modal', function () {
    player.pauseVideo();
  });
}