Template.comment.helpers({
  'comments': function() {
    return Comments.find();
  },
  'name': function() {
    return Meteor.users.findOne(this.userId).profile.username;
  }
});

Template.comment.events({
  'mouseenter .discussion': function(e) {
    e.preventDefault();

    animator.displayComment(this._id);
  },
  'mouseleave .discussion': function(e) {
    e.preventDefault();
    var commentId = $(e.target).data('id');

    animator.hideComment(commentId);
  }
});