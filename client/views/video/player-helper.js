Meteor.startup(function () {
  Session.set('YTApiReady', false);
  Session.set('channelRendered', false);
});

onYouTubeIframeAPIReady = function() {
  Session.set('YTApiReady', true);
};