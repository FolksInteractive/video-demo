Template.home.events({
  //Login form
  'click .submit' : function(e, t){
    e.preventDefault();
    var email = t.find('#email').value
    , password = t.find('#password').value;

    Meteor.loginWithPassword(email, password, function(err){
      if (err)
        console.log(err);
      else
        Router.go(document.URL);
      return false; 
    });
  }
});