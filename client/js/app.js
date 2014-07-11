jQuery(document).ready(function($){  
    $('.home').height($(window).height());


    $('#scrollup').click(function(e){
    	e.preventDefault();
    	$('.scrolled-hide').fadeOut();
    	$('.do-scroll-up').animate({
    		height : '200px'},{
   			duration: 700,
   			complete: function(){
    			$('.do-scroll-up').addClass('scrolled-up');
    			$('.scrolled').fadeIn();
    		}});
        $('.videos-list').removeClass('visible-xs');
    });
});


