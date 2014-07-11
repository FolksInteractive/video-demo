Router.map(function () {
  this.route('home', {
    path: '/',
    // template: 'home',
    layoutTemplate: 'homeLayout'
  });
  this.route('step2', {
    path: '/step2',
    template: 'step2',
    layoutTemplate: 'layout',
    yieldTemplates: {
      'header': {to: 'header'}
    }
  });
  this.route('step3', {
    path: '/step3',
    template: 'step3',
    layoutTemplate: 'layout',
    yieldTemplates: {
      'header': {to: 'header'}
    }
  });
});