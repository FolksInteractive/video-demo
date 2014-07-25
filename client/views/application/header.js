Template.header.events({
  'click a.logout': function() {
    Meteor.logout(function() {
      Router.go('home');
    });
  }
});