Template.videoModal.rendered = function() {
  var video = Videos.findOne(Session.get('currentVideoId'));
  player = Popcorn.youtube('.player', video.youtubeUrl);

  $('.modal').on('shown.bs.modal', function() {
    scrollToLastComment();
  });

  $('.modal').on('hidden.bs.modal', function () {
    player.pause();
  });

  createVideoProgressBar();

}

Template.videoModal.chapterTitle = function() {
  if(!!Session.get('currentChapterId')) {
    handleNavigation(); // Call the handle in a reactive manner when chapter changes
    return Chapters.findOne(Session.get('currentChapterId')).title;
  }
}

scrollToLastComment = function() {
  var scrollContent = $('.comments-wrapper');
  var height = scrollContent[0].scrollHeight;
  scrollContent.scrollTop(height);
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
    var value = player.currentTime()/player.duration() * 100;
    $('.progress-bar').attr('aria-valuenow', value);
    $('.progress-bar').css('width', value + '%');
  });

  hangleProgressBarNavigation();
}

var hangleProgressBarNavigation = function() {
  $('.progress').on('click', function(event) {
    var offSet = $(this).offset();
    var width = $(this).width();
    var xPos = (event.pageX - offSet.left);
    var time = (xPos / width) * player.duration();
    console.log(time);
    player.currentTime(time);
    player.play();
  });
}