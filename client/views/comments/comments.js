Template.comments.helpers({
  'comments': function() {
    var chapter = Session.get('currentChapterId');
    return Comments.find({chapterId: chapter}).fetch();
  },
  'username': function() {
    return Meteor.users.findOne(this.userId).profile.username;
  },
  'chapterTitle': function() {
    if(Session.get('currentChapterId'))
      return Chapters.findOne(Session.get('currentChapterId')).title;
  }
});

Template.comments.events({
  'submit .comment-form': function(e) {
    var text = $(e.target).find('input[name=body]').val();
    var comment = Comments.insert({
      body: text,
      userId: Meteor.userId(),
      chapterId: Session.get('currentChapterId')
    });
    $(e.target).find('input[name=body]').val(''); // clear field
    return false;
  }
});