getChaptersWithIndex = function() {
  return Chapters.find().map(function(doc, index, cursor) {
    var i = _.extend(doc, {index: index});
    return i;
  });
}

getChaptersTimeStamps = function() {
  return _.map(Chapters.find().fetch(), function(chapter) {
    return chapter.timeStamp;
  })
}