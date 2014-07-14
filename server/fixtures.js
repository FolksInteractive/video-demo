if (Meteor.users.find().count() === 0) {
  Accounts.createUser({
    username: 'admin',
    email : 'renaud@timecrumbs.com',
    password: 'admin1'}, function(err){
    if (err) {
            // Inform the user that account creation failed
    } else {
            // Success. Account has been created and the user
            // has logged in successfully. 
    }
    return false;
  });
  Meteor.logout();
}