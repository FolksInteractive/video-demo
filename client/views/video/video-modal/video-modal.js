Template.videoModal.rendered = function() {
  var video = Videos.findOne(Session.get('currentVideoId'));
  player = Popcorn.youtube('.player', video.youtubeUrl);

  $('.modal').on('shown.bs.modal', function() {
    scrollToLastComment();
  });

  $('.modal').on('hidden.bs.modal', function () {
    player.pause();
  });

  handleNavigation(lastChapter(), nextChapter());
}

Template.videoModal.chapterTitle = function() {
  if(!!Session.get('currentChapterId'))
    return Chapters.findOne(Session.get('currentChapterId')).title;
}

scrollToLastComment = function() {
  var scrollContent = $('.comments-wrapper');
  var height = scrollContent[0].scrollHeight;
  scrollContent.scrollTop(height);
}

var handleNavigation = function(previous, next) {
  previousChapter = previous;
  nextChapter = next;

  $('.previous-chapter').on('click', function() {
    if(!!previousChapter)
      player.currentTime(previousChapter.timeStamp);
    else 
      player.currentTime(0);//if first chapter
    player.play();
    return false;
  });
  $('.next-chapter').on('click', function() {
    player.currentTime(nextChapter.timeStamp);
    player.play();
    return false;
  });
}

var lastChapter = function() {
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