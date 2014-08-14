var resizeDeps = new Deps.Dependency();
Template.chapterCues.helpers({
  'chapters': function () {
    return Chapters.find();
  },
  'cuePosition': function () {
    var duration = Session.get('duration');
    if(!duration)
      return;

    resizeDeps.depend();
    return this.timeStamp / duration * $('body').width() - 1;
  }
});

Template.chapterCues.created = function() {
  $(window).resize(function() {
    resizeDeps.changed();
  });
};

Template.chapterCues.destroyed = function() {
  $(window).off('resize');
};