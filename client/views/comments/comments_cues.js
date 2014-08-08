Template.commentCues.helpers({
  'comments': function() {
    var comments = Comments.find().fetch();
    return comments;
  },
  'position': function() {
    var duration = Session.get('duration');
    if(!duration)
      return;
    // Progress bar ratio * width - 3 pixels for half of the icon
    return this.time / duration * $('body').width() - 3;
  }
});

Template.commentCues.events({
  'mouseenter .comment-cue': function(e) {
    e.preventDefault();
    animator.displayComment(this._id);
  },
  'mouseleave .comment-cue': function(e) {
    e.preventDefault();
    var commentId = $(e.target).data('id');
    animator.hideComment(commentId);
  }
});