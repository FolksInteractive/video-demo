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
  'mouseover .comment-cue': function(e) {
    e.preventDefault();
    var discussion = $('.discussion[data-id='+ this._id +']');
    discussion.show().animate({
      'top': '-336px',
      'opacity': '1',
      'z-index': '2'
    }, 400);
  },
  'mouseout .comment-cue': function(e) {
    e.preventDefault();
    var id = $(e.target).data('id');
    Session.set('commentTimeout', Meteor.setTimeout(function() {
      $('.discussion[data-id='+ id +']').animate({
        top: '0px',
        opacity: '0'
      }, 400);
    }, 4000));
  },
  'mouseover .discussion': function(e) {
    e.preventDefault();
    $('.cursor-overlay').toggle();
    clearTimeout(Session.get('commentTimeout'));
    var target = $(e.target);
    if(target.is('div')) {
      target.show();
    }
  },
  'mouseout .discussion': function(e) {
    e.preventDefault();
    var target = $(e.target);
    if(target.is('div')) 
      Meteor.setTimeout(function() {
        target.animate({
          top: '0px',
          opacity: '0'
        }, 400).hide();
      }, 4000);
    
}
});

