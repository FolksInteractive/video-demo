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
    youtubeUrl: 'https://www.youtube.com/watch?v=HKCH8HsdcOA&feature=youtu.be',
    chapters:
    [Chapters.insert({title: "Importance d'une communication efficace", 
      timeStamp: 0}),
    Chapters.insert({title: "Prospection de partenaires industriels", 
      timeStamp: 900}),
    Chapters.insert({title: "Approche de partenaires par courriel et par téléphone",
      timeStamp: 1800}),
    Chapters.insert({title: "Rencontre avec un partenaire industriel",
      timeStamp: 2700}),
    Chapters.insert({title: "Préoccupations d'un employeur potentiel et avantages de recruter un stagiaire",
      timeStamp: 3600}),
    Chapters.insert({title: "Les objections",
      timeStamp: 4500}),
    Chapters.insert({title: "Possibilités d'une bourse d'études combinée au stage",
      timeStamp: 5400}),
    Chapters.insert({title: "Conclusion de la vente et suivi des démarches",
      timeStamp: 7300})]
  });
}