Template.videoModal.rendered = function() {
  var video = Videos.findOne(Session.get('currentVideoId'));
  player = Popcorn.youtube('.player', video.youtubeUrl);

  player.on('play', function() {
    Session.set('duration', player.duration());
  });

  $('.modal').on('hidden.bs.modal', function () {
    player.pause();
  });

  createVideoProgressBar();
}

var timeout;
Template.videoModal.events({
  'submit .comment-form': function(e) {
    e.preventDefault();

    var text = $(e.target).find('input[name=body]').val();
    var comment = Comments.insert({
      body: text,
      userId: Meteor.userId(),
      chapterId: Session.get('currentChapterId'),
      time: Math.floor(player.currentTime())
    });

    $('.comment-form')[0].reset();
    return false;
  },
  'click .play-pause': function() {
    player.play();
  },
  'mousemove .modal-dialog': function(e) {
    e.preventDefault();

    if(timeout) {
      clearTimeout(timeout);
      $('.navigation *').show();
      $('.controls').animate({
        bottom: '50px'
      }, 100);
      $('.comments-bar').animate({
        bottom: '0px'
      },100);

    }

    timeout = setTimeout(function(){
      $('.navigation *').hide(400);
      $('.controls').animate({
        bottom: '-15px'
      }, 100);
      $('.comments-bar').animate({
        bottom: '-70px'
      },100);
    }, 3000);
  }
});

Template.videoModal.chapterTitle = function() {
  if(!!Session.get('currentChapterId')) {
    handleNavigation(); // Call the handle in a reactive manner when chapter changes
    return Chapters.findOne(Session.get('currentChapterId')).title;
  }
}

var handleNavigation = function() {
  previous = previousChapter();
  next = nextChapter();

  $('.previous-chapter').on('click', function() {
    if(!!previous)
      player.currentTime(previous.timeStamp);
    else
      player.currentTime(0);//if first chapter
    player.play();
    return false;
  });
  $('.next-chapter').on('click', function() {
    player.currentTime(next.timeStamp);
    player.play();
    return false;
  });
}

var previousChapter = function() {
  //Map index for chapters
  var chapters = getChaptersWithIndex();

  if (!Session.get('currentChapterId')) {
    Session.set('currentChapterId', chapters[0]._id);
  };

  var current = _.find(chapters, function(chapter) {
    return chapter._id === Session.get('currentChapterId');
  });

  return chapters[current.index - 1];
}

var nextChapter = function() {
  var chapters = getChaptersWithIndex();

  var current = _.find(chapters, function(chapter) {
    return chapter._id === Session.get('currentChapterId');
  });

  return chapters[current.index + 1];
}

var createVideoProgressBar = function() {
  player.on('timeupdate', function() {
    var currentTime = Math.floor(player.currentTime());
    //Green progress
    var value = currentTime/player.duration() * 100;
    $('.progress-bar').attr('aria-valuenow', value);
    $('.progress-bar').css('width', value + '%');

    if( !!Comments.findOne({time: currentTime}) ) {
      // var currentTime = player.currentTime();
      var comment = Comments.findOne({time: currentTime});
      
      $('.comment-item[data-id=' + comment._id + '] .comment').show().delay(5000).fadeOut();
    }

  });

  hangleProgressBarNavigation();
}

var hangleProgressBarNavigation = function() {
  $('.progress').on('click', function(event) {
    var offSet = $(this).offset();
    var width = $(this).width();
    var xPos = (event.pageX - offSet.left);
    var time = (xPos / width) * player.duration();
    player.currentTime(time);
    player.play();
  });
}
