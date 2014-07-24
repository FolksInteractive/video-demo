Template.comments.helpers({
  'comments': function() {
    var comments = Comments.find().fetch();
    return comments;
  },
  'position': function() {
    var duration = Session.get('duration');
    if(!duration)
      return;

    return this.time / duration * $('body').width() - 5;
  },
  'username': function() {
    return Meteor.users.findOne(this.userId).profile.username;
  },
  'chapterTitle': function() {
    if(Session.get('currentChapterId'))
      return Chapters.findOne(Session.get('currentChapterId')).title;
  }
});