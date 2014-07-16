Template.videosList.helpers({
  videos: function() {
    return Videos.find().fetch();
  }
});

Template.videosList.events({
  'click .person': function() {
    Router.go('video', {'id': this._id});

    if(!Subscriptions.findOne({userId: Meteor.userId(), videoId: this._id}))
      Subscriptions.insert({
        userId: Meteor.userId(), 
        videoId: this._id,
        completedChapters: []
      });
  }
});