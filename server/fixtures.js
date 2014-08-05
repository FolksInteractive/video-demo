if (Meteor.users.find().count() === 0) {
  _.each(Users, function (user) {
    var info = {
      profile: {
        username: user.name +  " " + user.lastName
      },
      email: user.email,
      password: user.password
    } 
    Accounts.createUser(info);
  });

  Accounts.createUser({
    profile: {
      username: 'Admin'
    },
    email: 'admin@simiuslabs.com',
    password: 'admin1'
  });
}

if (Videos.find().count() === 0) {
  Videos.insert({
    title: 'Techniques de sollicitation',
    youtubeUrl: 'http://www.youtube.com/nIlm4yTMSRI?controls=0&modestbranding=1',
    chapters:
    [Chapters.insert({title: "Importance d'une communication efficace", 
      timeStamp: 0}),
    Chapters.insert({title: "Prospection de partenaires industriels", 
      timeStamp: 40}),
    Chapters.insert({title: "Approche de partenaires par courriel et par téléphone",
      timeStamp: 80}),
    Chapters.insert({title: "Rencontre avec un partenaire industriel",
      timeStamp: 120}),
    Chapters.insert({title: "Préoccupations d'un employeur potentiel et avantages de recruter un stagiaire",
      timeStamp: 160}),
    Chapters.insert({title: "Les objections",
      timeStamp: 200}),
    Chapters.insert({title: "Possibilités d'une bourse d'études combinée au stage",
      timeStamp: 240}),
    Chapters.insert({title: "Conclusion de la vente et suivi des démarches",
      timeStamp: 280})]
  });
}