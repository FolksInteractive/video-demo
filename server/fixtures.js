if (Meteor.users.find().count() === 0) {
  Accounts.createUser({
    username: 'admin',
    email : 'renaud@timecrumbs.com',
    password: 'admin1'});
  Meteor.logout();
}

if (Videos.find().count() === 0) {
  Videos.insert({
    title: 'Techniques de sollicitation',
    youtubeId: 'HKCH8HsdcOA',
    chapters: [Chapters.insert({title: "Importance d'une communication efficace",
      completed: false, timeStamp: 0}),
    Chapters.insert({title: "Prospection de partenaires industriels",
      completed: false, timeStamp: 900}),
    Chapters.insert({title: "Approche de partenaires par courriel et par téléphone",
      completed: false, timeStamp: 1800}),
    Chapters.insert({title: "Rencontre avec un partenaire industriel",
      completed: false, timeStamp: 2700}),
    Chapters.insert({title: "Préoccupations d'un employeur potentiel et avantages de recruter un stagiaire",
      completed: false, timeStamp: 3600}),
    Chapters.insert({title: "Les objections",
      completed: false, timeStamp: 4500}),
    Chapters.insert({title: "Possibilités d'une bourse d'études combinée au stage",
      completed: false, timeStamp: 5400}),
    Chapters.insert({title: "Conclusion de la vente et suivi des démarches",
      completed: false, timeStamp: 7300})]
  });
}