// Basic layout configurations, can be overriden
Router.configure({
  layoutTemplate: 'layout',
  yieldTemplates: {
    'header': {to: 'header'}
  },    
  onBeforeAction: function(pause) {
    if (!(Meteor.loggingIn() || Meteor.user())) {
      this.render('home');
      pause();
    }
  }
});

Router.map(function () {
  this.route('home', {
    path: '/',
    template: 'home',
    layoutTemplate: 'homeLayout',
    onAfterAction: function() {
      if(!!Meteor.user())
        Router.go('videosList');
    }
  });

  this.route('videosList', {
    path: '/videos',
    template: 'videosList'
  });

  this.route('video', {
    path: '/video/:id',
    template: 'video',
    onBeforeAction: function() {
      Session.set('currentVideoId', this.params.id);
    }
  });

});