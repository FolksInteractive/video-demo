Template.comments.helpers({
  'comments': function() {
    return Comments.find();
  },
  'name': function() {
    return Meteor.users.findOne(this.userId).profile.username;
  }
});

Template.comments.events({
  'mouseover .discussion': function(e) {
    e.preventDefault();

    Meteor.clearTimeout(Session.get('commentTimeout'));  
    $('.discussion[data-id='+ this._id +']').show();
  },
  'mouseout .discussion': function(e) {
    e.preventDefault();
    var id = $(e.target).data('id');

    setTimeout(function() {
      $('.discussion[data-id='+ id +']').hide();
    }, 4000);
  }
});