Template.videosList.helpers({
  videos: function() {
    return Videos.find().fetch();
  }
});

Template.videosList.events({
  'click .person': function() {
    Router.go('video', {'id': this._id});
  }
});