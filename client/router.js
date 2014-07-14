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
    layoutTemplate: 'homeLayout'
  });

  this.route('step2', {
    path: '/step2',
    template: 'step2'
  });

  this.route('step3', {
    path: '/step3',
    template: 'step3'
  });

});