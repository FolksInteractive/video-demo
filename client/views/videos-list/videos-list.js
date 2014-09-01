Template.videosList.rendered = function() {
  $('.head').show(); // Show header if on video page has been scrolled
};

Template.videosList.helpers({
  videos: function() {
    return Videos.find().fetch();
  }
});

Template.videosList.events({
  'click .person-profile': function() {
    Router.go('video', {'id': this._id});
    //If user isn't already subscribed to the video create new subscription
    if(!Subscriptions.findOne({userId: Meteor.userId(), videoId: this._id}))
      Subscriptions.insert({
        userId: Meteor.userId(), 
        videoId: this._id,
        completedChapters: []
      });
  }
});

Template.videoItem.commentsAmount = function() {
  return Comments.find().count();
};