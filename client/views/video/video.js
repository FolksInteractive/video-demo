//Scroll helper
Template.video.helpers({
  rendered: function() {
    $('#scrollup').click(function(e){
      e.preventDefault();
      $('.scrolled-hide').fadeOut();
      $('.do-scroll-up').animate({
        height : '200px'},{
          duration: 700,
          complete: function(){
            $('.do-scroll-up').addClass('scrolled-up');
            $('.scrolled').fadeIn();
          }});
      $('.videos-list').removeClass('visible-xs');
    });
  },
  video: function() {
    return Videos.findOne(Session.get('currentVideoId'));
  },
  chapters: function() {
    return Chapters.find({'_id': {$in: this.chapters}});
  }
});

Template.chapter.events({
  'click a': function() {
    var completed = Meteor.user().profile.watchedChapters;
    completed.push(this._id);
    Meteor.users.update({_id: Meteor.user()._id}, {$set: {"profile.watchedChapters": completed}});
    var video = Videos.findOne(Session.get('currentVideoId'));
    player.cueVideoById(video.youtubeId, this.timeStamp);
    player.playVideo();
  }
});

Template.videoModal.rendered = function() {
  $('.modal').on('hidden.bs.modal', function () {
    player.pauseVideo();
  });
}