Template.comments.helpers({
  'comments': function() {
    var comments = Comments.find().fetch();
    return comments;
  },
  'position': function() {
    var duration = Session.get('duration');
    if(!duration)
      return;
    // Progress bar ratio * width - 5 pixels for half of the icon
    return this.time / duration * $('body').width() - 3;
  },
  'username': function() {
    return Meteor.users.findOne(this.userId).profile.username;
  },
  'chapterTitle': function() {
    if(Session.get('currentChapterId'))
      return Chapters.findOne(Session.get('currentChapterId')).title;
  },
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

Template.comments.events({
  'mouseover .comment-item .icon': function(e) {
    $(e.target).siblings().show();
  },
  'mouseout .comment-item .icon': function (e) {
    $(e.target).siblings().hide(); 
  }
});

