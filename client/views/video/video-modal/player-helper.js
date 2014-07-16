Meteor.startup(function () {
  Session.set('YTApiReady', false);
  Session.set('channelRendered', false);
});

onYouTubeIframeAPIReady = function() {
  Session.set('YTApiReady', true);
};

Template.videoModal.created = function () {
  if (typeof player === 'undefined')
    $.getScript('https://www.youtube.com/iframe_api', function () {});
};

Template.videoModal.rendered = function() {
  Session.set('channelRendered', true);
};

Template.videoModal.destroyed = function () {
  Session.set('channelRendered', false);
};

Deps.autorun(function (c) {
  if (Session.equals('YTApiReady', false) || 
    Session.equals('channelRendered', false)) {
    return;
  }

  var interval = Meteor.setInterval(function () {
  
    if(!document.getElementById('player')) {
      return;
    }
    
    var playerDiv = document.createElement('div');

    playerDiv.id = 'player';
    document.getElementById('player-parent').innerHTML = '';
    document.getElementById('player-parent').appendChild(playerDiv);

    player = null;
    player = new YT.Player('player', {
      events: {
        'onStateChange': function(state) {
          Session.set('playerState', state.data);
        }
      }
    });

    Meteor.clearInterval(interval);
  }, 100);
});
