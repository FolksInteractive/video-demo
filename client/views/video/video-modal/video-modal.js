Template.videoModal.rendered = function() {
  var video = Videos.findOne(Session.get('currentVideoId'));
  player = Popcorn.youtube('.player', video.youtubeUrl);

  $('.modal').on('hidden.bs.modal', function () {
    player.pause();
  });

  handlePlayerEvents();
};

Template.videoModal.helpers({
  'chapterTitle': function() {
    if(!!Session.get('currentChapterId')) {
      return Chapters.findOne(Session.get('currentChapterId')).title;
    }
  },
  'chapterIndex': function() {
    var chapters = getChaptersWithIndex();
    var current = _.find(chapters, function(chapter) {
      return chapter._id === Session.get('currentChapterId');
    });
    if(!!current)
      return (current.index + 1) + " / " + chapters.length;
  }
});

Template.videoModal.events({
  'submit .comment-form': function(e) {
    e.preventDefault();

    var text = $(e.target).find('input[name=body]').val();

    var comment = Comments.insert({
      body: text,
      userId: Meteor.userId(),
      chapterId: Session.get('currentChapterId'),
      time: Session.get('commentTime')
    }, function(err) {
      if(err)
        console.log(err);
    });

    $('.comment-form')[0].reset();
    animator.hideCommentForm();

    return false;
  },
  'click .previous-chapter': function(e) {
    var previous = previousChapter();

    if(!!previous)
      player.currentTime(previous.timeStamp);
    else
      player.currentTime(0);//if first chapter
    player.play();
  },
  'click .next-chapter': function(e) {
    var next = nextChapter();
    player.currentTime(next.timeStamp);
    player.play();
    return false;
  },
  'click .progress': function(e) {
    var xPos = e.pageX;
    var time = getClickTime(xPos); 

    player.currentTime(time);
    player.play();
  },
  'click .exit': function(e) {
    $('.modal').modal('hide');
  },
  'mouseenter .progress': function(e) {
    animator.displayProgressOverlay();
    animator.displayCommentPopup();
  },
  'mouseleave .progress': function(e) {
    animator.hideProgressOverlay();
  },
  'mousemove .progress': function(e) {
    animator.moveProgressOverlay(e.pageX);
    animator.moveCommentPopup(e.pageX);
  },
  'mouseenter .comment-popup': function() {
    animator.hideProgressOverlay();
  },
  'click .comment-popup': function(e) {
    if(!animator.commentFormToggled)
      animator.displayCommentForm();
    else
      animator.hideCommentForm();

    var xPos = e.pageX;
    var time = getClickTime(xPos); 
    Session.set('commentTime', time);
  },
  'mouseenter .navigation': function() {
    animator.hideCommentPopup();
  },
  'click .navigation': function(e) {
    e.preventDefault();
    if(Session.get('playing'))
      player.pause();    
    else
      player.play();
  },
  'mouseenter .index': function(e) {
    animator.displayChapterTitle();
  },
  'mouseleave .index': function() {
    animator.hideChapterTitle();    
  }
});

/*
* NAVIGATION HELPERS
*/ 
var previousChapter = function() {
  //Map index for chapters
  var chapters = getChaptersWithIndex();

  if (!Session.get('currentChapterId')) {
    Session.set('currentChapterId', chapters[0]._id);
  }

  var current = _.find(chapters, function(chapter) {
    return chapter._id === Session.get('currentChapterId');
  });

  return chapters[current.index - 1];
};

var nextChapter = function() {
  var chapters = getChaptersWithIndex();

  var current = _.find(chapters, function(chapter) {
    return chapter._id === Session.get('currentChapterId');
  });

  return chapters[current.index + 1];
};

var getClickTime = function(xPosition) {
  var width = $('body').width(); //Width of nav-bar
  //Get time from position percentage
  return (xPosition / width) * player.duration(); 
};

/**************
* PLAYER EVENTS
***************/
var handlePlayerEvents = function() {
  player.on('play', function() {
    Session.set('duration', player.duration());
    Session.set('playing', true);

    //Reactive animation for chapter change
    if(!!Session.get('currentChapterId')) {
      animator.displayChapterTitle();
      setTimeout(function() {
        animator.hideChapterTitle(); 
      }, 3000);
    }
  });

  player.on('pause', function() {
    Session.set('playing', false);
  });

  player.on('timeupdate', function() {
    var currentTime = Math.floor(player.currentTime());
    //Green progress
    var value = currentTime/player.duration() * 100;

    createProgressBar(value);

    if( !!Comments.findOne({time: currentTime}) ) {
      var comment = Comments.findOne({time: currentTime});

      animator.displayComment(comment._id);
      animator.hideComment(comment._id);
    }
  });
};

var createProgressBar = function(value) {
  $('.progress-bar').attr('aria-valuenow', value);  
  $('.progress-bar').css('width', value + '%');
};