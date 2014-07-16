Template.comments.helpers({
  'comments': function() {
    var chapter = Session.get('currentChapterId');
    return Comments.find({chapterId: chapter}).fetch();
  },
  'username': function() {
    return Meteor.users.findOne(this.userId).profile.username;
  }
});

Template.comments.events({
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
          $('.form-control').val('');
      });
    }
  }
});