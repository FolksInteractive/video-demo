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

    return pos;
  },
  'arrowFix': function() {
    var duration = Session.get('duration');
    if(!duration)
      return;

    var pos = this.time / duration * $('body').width() - 3;

    if(pos <= 150) 
      return pos - 50;
    else if(pos >= ($('body').width() - 300)) 
      return 225;
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
  },
  'mouseenter .discussion': function(e) {
    e.preventDefault();
    var commentId = $(e.target).data('id');
    animator.displayComment(commentId);
    animator.hideCommentPopup();
    animator.hideProgressOverlay();
  },
  'mouseleave .discussion': function(e) {
    e.preventDefault();
    var commentId = $(e.target).data('id');
    animator.hideComment(commentId);
  }
});