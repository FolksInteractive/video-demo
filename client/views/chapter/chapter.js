Template.chapter.events({
  //Play clicked chapter
  'click a': function() {  
    player.play();
    player.currentTime(this.timeStamp);//Set time to chapter timeStamp
    Session.set('currentChapterId',this._id);
    updateSubscription();
    handleChapterChange();
  }
});

//Completed helper puts green checkmark on completed chapters
Template.chapter.completed = function() {
  var currentId = this._id;
  var completedChapters = Subscriptions.findOne({userId: Meteor.userId(), 
    videoId: Session.get('currentVideoId')}).completedChapters;
  var matching = completedChapters.filter(function(chapter) {
    return currentId === chapter}).length;
  if(matching > 0) 
    return true;
}

Template.chapter.commentsAmount = function() {
  return Comments.find({'chapterId': this._id}).count();
}

/*
* This function checks if the current player time is over the chapter 
* end timeStamp. If so, the currentChapterId session variable is updated.
*/
var handleChapterChange = function() {
  var timeStamps = getChaptersTimeStamps();

  player.on( "timeupdate", function(e) {
    if(!player.paused()) {
      var current = _.find(timeStamps, function(timeStamp) {
        var index = _.indexOf(timeStamps, timeStamp);
        var time = player.currentTime();

        if(time >= timeStamp && time < timeStamps[index + 1])
          return true;
      });
      
      if(Chapters.findOne(Session.get('currentChapterId')).timeStamp !== 
        current) {
        Session.set('currentChapterId', 
          Chapters.findOne({'timeStamp': current})._id);
        updateSubscription();
      }
    } 
  });
}

var updateSubscription = function() {
  //Push currentChapterId to the users subscription
  var subscription = Subscriptions.findOne({userId: Meteor.userId(), 
    videoId: Session.get('currentVideoId')});
  var completedChapters = subscription.completedChapters;
  //If not already in subscription's completed chapters
  if(completedChapters.indexOf(Session.get('currentChapterId')) === -1) { 
    completedChapters.push(Session.get('currentChapterId'));
    Subscriptions.update(subscription._id, {$set: {"completedChapters": 
      completedChapters}});
  }
}