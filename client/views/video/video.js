Template.video.helpers({
  video: function() {
    return Videos.findOne(Session.get('currentVideoId'));
  },
  chapters: function() {
    return Chapters.find({'_id': {$in: this.chapters}});
  }
});

Template.video.events({
  'click #scrollup': function() {
    $('.scrolled-hide').fadeOut();
    $('.do-scroll-up').animate({
      height : '200px'},{
        duration: 700,
        complete: function(){
          $('.do-scroll-up').addClass('scrolled-up');
          $('.scrolled').fadeIn();
        }});
    $('.videos-list').removeClass('visible-xs');
  }
});

Template.video.rendered = function() {
  $('.video').scroll(function(e) {
    var position = $(this).scrollTop();
    if(position > 10)
      $('.head').slideUp(500);
    else 
      $('.head').slideDown(500);
  });
}