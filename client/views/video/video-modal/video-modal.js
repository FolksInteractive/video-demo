Template.videoModal.rendered = function() {
  var video = Videos.findOne(Session.get('currentVideoId'));
  player = Popcorn.youtube('.player', video.youtubeUrl);

  player.on('play', function() {
    Session.set('duration', player.duration());
    Session.set('playing', true);

    $('.play').toggle();
    $('.pause').toggle();

    //Animate chapter title in a reactive maner
    var currentChapter = Session.get('currentChapterId');
    console.log(currentChapter)
    if(!!currentChapter) {
      $('.navigation .text').fadeIn(500);
      setTimeout(function() {
        $('.navigation .text').fadeOut(500);  
      }, 3000);
    }
  });

  player.on('pause', function() {
    Session.set('playing', false);

    $('.play').toggle();
    $('.pause').toggle();
  });

  $('.modal').on('hidden.bs.modal', function () {
    player.pause();
  });

  createVideoProgressBar();
};

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
  'click .play': function(e) {
    e.preventDefault();    
    player.play();
  },
  'click .pause': function(e) {
    e.preventDefault();
    player.pause();
  },
  'mousemove .navigation': function(e) {
    e.preventDefault();

    if(!!timeout) {
      clearTimeout(timeout);
    }
    $('.controls').stop().animate({
      bottom: '50px'
    },500, 'easeInOutQuart');
    $('.comments-bar').stop().animate({
      bottom: '0px'
    },500, 'easeInOutQuart');


    timeout = setTimeout(function(){
      $('.controls').stop().animate({
        bottom: '-15px'
      },500, 'easeInOutQuart');
      $('.comments-bar').stop().animate({
        bottom: '-70px'
      },500, 'easeInOutQuart');

    }, 1000);
  },
  'click .previous-chapter': function(e) {
    e.preventDefault();
    var previous = previousChapter();

    if(!!previous)
      player.currentTime(previous.timeStamp);
    else
      player.currentTime(0);//if first chapter
    player.play();
    return false;
  },
  'click .next-chapter': function(e) {
    e.preventDefault();
    var next = nextChapter();
    player.currentTime(next.timeStamp);
    player.play();
    return false;
  },
  'click .progress': function(e) {
    e.preventDefault();

    var width = $('body').width(); //Width of nav-bar
    var xPos = e.pageX;
    //Get time from position percentage
    var time = (xPos / width) * player.duration(); 

    player.currentTime(time);
    player.play();

    return false;
  },
  'mouseover .progress': function(e) {
    e.preventDefault();

    $('.cursor-overlay').toggle();
  },
  'mouseout .progress': function(e) {
    e.preventDefault();

    $('.cursor-overlay').toggle();
  },
  'mousemove .progress': function(e) {
    e.preventDefault();
    $('.cursor-overlay').width(e.pageX);
  },
  'click .navigation': function(e) {
    e.preventDefault();
    if(Session.get('playing'))
      player.pause();    
    else
      player.play();
  },
  'mouseover .comments-bar, .controls': function(e) {
    e.preventDefault();

    if(timeout) {
      clearTimeout(timeout);
      // $('.controls').animate({
      //   bottom: '50px'
      // },500, 'easeInOutQuart');
      // $('.comments-bar').animate({
      //   bottom: '0px'
      // },500, 'easeInOutQuart');
}
}
});

Template.videoModal.chapterTitle = function() {
  if(!!Session.get('currentChapterId')) {
    return Chapters.findOne(Session.get('currentChapterId')).title;
  }
};

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

var createVideoProgressBar = function() {
  player.on('timeupdate', function() {
    var currentTime = Math.floor(player.currentTime());
    //Green progress
    var value = currentTime/player.duration() * 100;

    $('.progress-bar').attr('aria-valuenow', value);
    $('.progress-bar').css('width', value + '%');

    if( !!Comments.findOne({time: currentTime}) ) {
      var comment = Comments.findOne({time: currentTime});
      
      $('.discussion[data-id=' + comment._id + ']').show();

      Session.set('commentTimeout', setTimeout(function() {
        $('.discussion[data-id=' + comment._id + ']').hide();
      }, 4000));
    }

  });
};