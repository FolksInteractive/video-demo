ModalAnimator = function () {
  this.chapterTimeout;
  this.commentTimeout;
  this.commentFormToggled = false;
};

animator = new ModalAnimator();

/*
* Chapter Title
*/
ModalAnimator.prototype.displayChapterTitle = function() {
  Meteor.clearTimeout(animator.chapterTimeout);
  $('.navigation').fadeIn(500);
};

ModalAnimator.prototype.hideChapterTitle = function() {
  this.chapterTimeout = Meteor.setTimeout(function() {
    $('.navigation').fadeOut(1000);
  }, 3000); 
};

/*
* Comment
*/
ModalAnimator.prototype.displayComment = function(commentId) {
  $('.discussion[data-id='+ commentId +']').show().animate({  
    'bottom': '55px',
    'opacity': '1',
    'z-index': '0'
  }, 800);
};

ModalAnimator.prototype.hideComment = function(commentId) {
  this.commentTimeout = Meteor.setTimeout(function() {
    $('.discussion[data-id='+ commentId +']').animate({
      'bottom': '0px',
      'opacity': '0',
      'z-index': '-1'
    }, 400);
  }, 3000);
};

/*
* Comment pop-up
*/
ModalAnimator.prototype.displayCommentPopup = function() {
  Meteor.clearTimeout(this.popupTimeout);
  $('.comment-popup').animate({
    'opacity': 1
  }, 100);
};

ModalAnimator.prototype.hideCommentPopup = function() {  
  this.popupTimeout = Meteor.setTimeout(function() {
    $('.comment-popup').animate({
      'opacity': 0.5
    }, 100);
  }, 500);
};

ModalAnimator.prototype.moveCommentPopup = function(xValue) {
  $('.comment-popup').animate({
    'left': xValue + "px"
  }, 100, 'easeInOutQuart');
};

/*
* Comment cues
*/
ModalAnimator.prototype.displayCommentCues = function(cueId) {
  $('.comment-cue[data-id='+ cueId +']').animate({
    'opacity': 1
  }, 100);
};

ModalAnimator.prototype.hideCommentCues = function() {
  $('.comment-cue').animate({
    'opacity': 0.5
  }, 100);
};

/*
* Progress overlay
*/
ModalAnimator.prototype.displayProgressOverlay = function() {
  $('.cursor-overlay').show();
};

ModalAnimator.prototype.hideProgressOverlay = function() {
  $('.cursor-overlay').hide();
};

ModalAnimator.prototype.moveProgressOverlay = function(xValue) {
  $('.cursor-overlay').width(xValue);
};

/*
* Current time popup 
*/ 
ModalAnimator.prototype.displayTimePopup = function() {
  $('.current-time').fadeIn(500);
};

ModalAnimator.prototype.hideTimePopup = function() {  
  $('.current-time').fadeOut(500);
};

ModalAnimator.prototype.moveTimePopup = function(xValue) {
  $('.current-time').css('left', xValue + "px");

  var time = Math.round((xValue / $('body').width()) * player.duration());
  var min = Math.round(time / 60);
  var secs = (time % 60 < 10) ? (0 + ""+ (time % 60)) : (time % 60);
  $('.current-time').text(min + ":" + secs);
}

/*
* Comment-form
*/
ModalAnimator.prototype.displayCommentForm = function() {
  Meteor.clearTimeout(this.popupTimeout);

  $('.controls').animate({
    bottom: '50px'
  }, 500, 'easeInOutQuart');
  $('.comments-bar').animate({
    bottom: '0px'
  }, 500, 'easeInOutQuart');
  $('.comment-popup').animate({
    bottom: '97px'
  }, 500, 'easeInOutQuart');
  $('.discussion').animate({
    bottom: '125px'
  }, 500, 'easeInOutQuart'); 
  $('.current-time').animate({
    bottom: '120px'
  }, 500, 'easeInOutQuart');  

  this.commentFormToggled = true;
};

ModalAnimator.prototype.hideCommentForm = function() {
  $('.controls').animate({
    bottom: '-15px'
  }, 500, 'easeInOutQuart');
  $('.comments-bar').animate({
    bottom: '-70px'
  }, 500, 'easeInOutQuart');
  $('.comment-popup').animate({
    bottom: '33px'
  }, 500, 'easeInOutQuart');
  $('.discussion').animate({
    bottom: '55px'
  }, 500, 'easeInOutQuart');
  $('.current-time').animate({
    bottom: '60px'
  }, 500, 'easeInOutQuart');

  this.commentFormToggled = false;
}