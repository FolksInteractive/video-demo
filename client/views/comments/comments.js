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
  //Enter button listener (13 is the char associated)
  'keypress input': function(e) {
    if(e.which === 13) {
      var text = $('.form-control').val();
      var comment = Comments.insert({
        body: text,
        userId: Meteor.userId(),
        chapterId: Session.get('currentChapterId')
      }, function(err) {
        if(err)
          console.log(err);
        else 
          $('.form-control').val('');//Clear the field
      });
    }
  }
});