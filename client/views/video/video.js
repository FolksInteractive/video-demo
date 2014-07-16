// SCROLL HELPER - VIDEO
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

// CHAPTER
var playerState;
Template.chapter.events({
  'click a': function() {
    var subscription = Subscriptions.findOne({userId: Meteor.userId(), 
      videoId: Session.get('currentVideoId')});
    var completedChapters = subscription.completedChapters;

    if(completedChapters.indexOf(this._id) === -1) {
      completedChapters.push(this._id);
      Subscriptions.update(subscription._id, {$set: {"completedChapters": completedChapters}})
    }

    var video = Videos.findOne(Session.get('currentVideoId'));
    player.cueVideoById(video.youtubeId, this.timeStamp);
    player.playVideo();

    Session.set('currentChapterId',this._id);
    Meteor.setInterval(chapterChange,10000);//Call every 100sec
  }
});

Template.chapter.rendered = function() {
  var currentId = this.data._id;
  var completedChapters = Subscriptions.findOne({userId: Meteor.userId(), 
    videoId: Session.get('currentVideoId')}).completedChapters;
  var matching = completedChapters.filter(function(chapter) {
    return currentId === chapter}).length;
  if(matching > 0) 
    $('a[data-id='+ currentId+']').addClass('checked');
}

var chapterChange = function() {
  var time = player.getCurrentTime();
  var current = Chapters.findOne(Session.get('currentChapterId'));
  var chapterEnd = current.timeStamp;
  
  if(time > (chapterEnd + 900)) {
    Session.set('currentChapterId', 
      Chapters.findOne({'timeStamp': chapterEnd+900})._id);
    var subscription = Subscriptions.findOne({userId: Meteor.userId(), 
      videoId: Session.get('currentVideoId')});
    var completedChapters = subscription.completedChapters;

    if(completedChapters.indexOf(Session.get('currentChapterId')) === -1) {
      completedChapters.push(Session.get('currentChapterId'));
      Subscriptions.update(subscription._id, {$set: {"completedChapters": completedChapters}})
    }
  }
  console.log(Session.get('currentChapterId'));
}

// VIDEO MODAL
Template.videoModal.rendered = function() {
  $('.modal').on('hidden.bs.modal', function () {
    player.pauseVideo();
  });
}