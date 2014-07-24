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

Template.videoModal.events({
  'submit .comment-form': function(e) {
    var text = $(e.target).find('input[name=body]').val();
    var comment = Comments.insert({
      body: text,
      userId: Meteor.userId(),
      chapterId: Session.get('currentChapterId'),
      time: Math.floor(player.currentTime())
    });

    $(e.target).find('input[name=body]').val(''); // clear fiel
    return false;
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
      var currentTime = player.currentTime();
      var comment = Comments.findOne({time: currentTime});
      console.log(comment);
      $('.comment-item[data-id=' + comment._id + ']').show();
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