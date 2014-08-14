var resizeDeps = new Deps.Dependency();
Template.comments.helpers({
  'comments': function() {
    return Comments.find();
  },
  'name': function() {
    return Meteor.users.findOne(this.userId).profile.username;
  },
  'discussionPos': function() {
    var duration = Session.get('duration');
    if(!duration)
      return;

    var pos = this.time / duration * $('body').width() - 3;
    if(pos <= 150) 
      return 150;
    else if(pos >= ($('body').width() -300))
      return pos - 125;

    resizeDeps.depend();
    return pos;
  },
  'arrowFix': function() {
    var duration = Session.get('duration');
    if(!duration)
      return;

    var pos = this.time / duration * $('body').width() - 6;

    if(pos <= 150) 
      return pos - 50;
    else if(pos >= ($('body').width() - 300)) 
      return 223;
  }
});

Template.comments.events({
  'mouseenter .discussion': function(e) {
    e.preventDefault();

    Meteor.clearTimeout(animator.commentTimeout);
    // animator.displayComment(this._id);
    animator.hideCommentPopup();
    animator.hideProgressOverlay();
  },
  'mouseleave .discussion': function(e) {
    e.preventDefault();
    var commentId = $(e.target).data('id');

    animator.hideComment(commentId);
  }
});

Template.comments.created = function() {
  $(window).resize(function() {
    resizeDeps.changed();
  });
};

Template.comments.destroyed = function() {
  $(window).off('resize');
};