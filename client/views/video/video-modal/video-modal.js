Template.videoModal.rendered = function() {
  $('.modal').on('shown.bs.modal', function() {
    scrollToLastComment();
  });

  $('.modal').on('hidden.bs.modal', function () {
    player.pauseVideo();
  });
}

Template.videoModal.notfFirst = function() {
  return !(Chapters.findOne()._id === Session.get('currentChapterId'));
}

Template.videoModal.lastChapter = function() {
  //Map index for chapters
  var chapters = Chapters.find().map(function(doc, index, cursor) {
    var i = _.extend(doc, {index: index});
    return i;
  });
  
  if (!Session.get('currentChapterId')) {
    Session.set('currentChapterId', chapters[0]._id);
  };

  var current = _.find(chapters, function(chapter) {
    return chapter._id === Session.get('currentChapterId');
  });
  var lastChapter = chapters[current.index - 1];
  var nextChapter = chapters[current.index + 1];

  handleNavigation(lastChapter, nextChapter);

  if(current.index !== 0)
    return lastChapter.title;
}

scrollToLastComment = function() {
  var scrollContent = $('.comments-wrapper');
  var height = scrollContent[0].scrollHeight;
  scrollContent.scrollTop(height);
}

var handleNavigation = function(previous, next) {
  previousChapter = previous;
  nextChapter = next;
  $('.previous-chapter').click(previous,function() {
    player.seekTo(previousChapter.timeStamp, true);
    return false;
  });
  $('.next-chapter').click(next, function() {
    player.seekTo(nextChapter.timeStamp, true);
    return false;
  });
}