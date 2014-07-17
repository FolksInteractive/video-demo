Template.chapter.events({
  //Play clicked chapter
  'click a': function() {
    var video = Videos.findOne(Session.get('currentVideoId'));
    player.cueVideoById(video.youtubeId, this.timeStamp);
    player.playVideo();

    Session.set('currentChapterId',this._id);
    updateSubscription();

    Meteor.setInterval(chapterChange,100);//Call every 2sec
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
var chapterChange = function() {
  var time = player.getCurrentTime(); //Player time
  var current = Chapters.findOne(Session.get('currentChapterId')); //Current chapter
  var chapterStart = current.timeStamp;
  var chapterEnd = chapterStart + 900;//End of current chapter
  
  //If currentTime exceeded chapterEnd or before start
  if(time > (chapterEnd) || time < (chapterStart)) {
    var timeRange = Math.floor(time/900) * 900; //New chapter's timerange
    Session.set('currentChapterId', 
      Chapters.findOne({'timeStamp': timeRange})._id);

    updateSubscription();
  }
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