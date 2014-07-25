Template.home.rendered = function() {
  $('.accounts-error').hide();
}

Template.home.events({
  //Login form
  'submit .login-form' : function(e, t){
    e.preventDefault();
    var email = t.find('#email').value
    , password = t.find('#password').value;

    Meteor.loginWithPassword(email, password, function(err){
      if (err) {
        console.log(err.reason);
        $('.accounts-error').fadeIn(100).text(err.reason);
        $('.login-form').css('margin-top', '26px');
      }
      else
        Router.go(document.URL);
      return false; 
    });
  }
});