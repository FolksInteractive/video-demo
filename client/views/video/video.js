Template.video.created = function () {
  if (typeof player === 'undefined')
    $.getScript('https://www.youtube.com/iframe_api', function () {});
};

Template.video.rendered = function() {
  Session.set('channelRendered', true);
};

Template.video.destroyed = function () {
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
    videoId: "HKCH8HsdcOA"
  });

  // player.loadVideoByUrl({mediaContentUrl: "http://www.youtube.com/embed/HKCH8HsdcOA"});
  console.log(player);
  Meteor.clearInterval(interval);
}, 100);
});

//Scroll helper
Template.video.helpers({
  rendered: function() {
    $('#scrollup').click(function(e){
      e.preventDefault();
      $('.scrolled-hide').fadeOut();
      $('.do-scroll-up').animate({
        height : '200px'},{
          duration: 700,
          complete: function(){
            $('.do-scroll-up').addClass('scrolled-up');
            $('.scrolled').fadeIn();
          }});
      $('.videos-list').removeClass('visible-xs');
    });
  }
});