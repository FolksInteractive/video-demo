ModalAnimator = function () {
  this.popupTimeout;
  this.commentTimeout;
  this.commentFormToggled = false;
};

animator = new ModalAnimator();

/*
* Chapter Title
*/
ModalAnimator.prototype.displayChapterTitle = function() {
  $('.navigation .text').fadeIn(200);
};

ModalAnimator.prototype.hideChapterTitle = function() {
  $('.navigation .text').fadeOut(200); 
};

/*
* Comment
*/
ModalAnimator.prototype.displayComment = function(commentId) {
  Meteor.clearTimeout(this.commentTimeout); //Stop hide from cue out

  $('.discussion[data-id='+ commentId +']').show().animate({  
    'top': '-336px',
    'opacity': '1',
    'z-index': '2'
  }, 400);
};

ModalAnimator.prototype.hideComment = function(commentId) {
  this.commentTimeout = Meteor.setTimeout(function() {
    $('.discussion[data-id='+ commentId +']').hide().animate({
      top: '0px',
      opacity: '0'
    }, 400);
  }, 4000);
};

/*
* Comment pop-up
*/
ModalAnimator.prototype.displayCommentPopup = function() {
  Meteor.clearTimeout(this.popupTimeout);
  $('.comment-popup').show();
};

ModalAnimator.prototype.hideCommentPopup = function() {  
  this.popupTimeout = Meteor.setTimeout(function() {
    $('.comment-popup').hide(800);
  }, 3000);
};

ModalAnimator.prototype.moveCommentPopup = function(xValue) {
  $('.comment-popup').show();
  $('.comment-popup').css('left', xValue + "px");
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
    bottom: '95px'
  }, 500, 'easeInOutQuart');
  $('.navigation').css('height', 'calc(100% - 80px)');  

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
    bottom: '25px'
  }, 500, 'easeInOutQuart');
  $('.navigation').css('height', 'calc(100% - 15px)');
}