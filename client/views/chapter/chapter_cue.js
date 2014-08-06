Template.chapterCues.helpers({
  'chapters': function () {
    return Chapters.find();
  },
  'cuePosition': function () {
    var duration = Session.get('duration');
    if(!duration)
      return;

    return this.timeStamp / duration * $('body').width() - 1;
  }
});