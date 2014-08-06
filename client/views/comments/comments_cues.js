Template.commentCues.helpers({
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
  }
});

Template.commentCues.events({
  'mouseover .comment-cue': function(e) {
    e.preventDefault();

    $('.discussion[data-id='+ this._id +']').show();
  },
  'mouseout .comment-cue': function(e) {
    e.preventDefault();
    var id = $(e.target).data('id');
    Session.set('commentTimeout', Meteor.setTimeout(function() {
      $('.discussion[data-id='+ id +']').hide();
    }, 4000));
  },
  'mouseover .discussion': function(e) {
    e.preventDefault();
    clearTimeout(Session.get('commentTimeout'));
    var target = $(e.target);
    if(target.is('div'))
      target.show();
  },
  'mouseout .discussion': function(e) {
    e.preventDefault();
    var target = $(e.target);
    if(target.is('div'))
      target.hide();
  }
});

