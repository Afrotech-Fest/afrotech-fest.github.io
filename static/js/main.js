
//Accessible smooth scrolling courtesy https://css-tricks.com/snippets/jquery/smooth-scrolling/

var headerHeight = $("header .navbar").height();

// Select all links with hashes
$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]')
.not('[href="#0"]')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - headerHeight
      }, 850, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.focus(); // Set focus again
        };
      });
    }
  }
});

// Thanks to author Andrew Ross

var AROSSMN = AROSSMN || {};

(function($, APP) {

    $(function() {
        APP.Viewport.init();
 
    });



// ---------------------------------------------------------------------
// Detect if element is in the viewport
// ---------------------------------------------------------------------

APP.Viewport = {

    init: function() {

        $.fn.isOnScreen = function(){
			var elementTop = $(this).offset().top,
				elementBottom = elementTop + $(this).outerHeight(),
				viewportTop = $(window).scrollTop(),
				viewportBottom = viewportTop + $(window).height();
			return elementBottom > viewportTop && elementTop < viewportBottom;
		};

		function detection() {
			for(var i = 0; i < items.length; i++) {
				var el = $( items[i] );

				if( el.isOnScreen() ){
					el.addClass('in-view');
				} else {
                    el.removeClass('in-view');
                }
			}
		}

		var items = document.querySelectorAll('*[data-animate-in], *[data-detect-viewport]'),
            waiting = false,
            w = $(window);

		w.on("resize scroll", function(){
			if (waiting) {
		        return;
		    }
			waiting = true;
			detection();

			setTimeout(function () {
		        waiting = false;
		    }, 100);
		});

		$(document).ready(function(){
            setTimeout(function(){
                detection();
            }, 500);

			for(var i = 0; i < items.length; i++) {
				var d = 0,
					el = $( items[i] );
				if( items[i].getAttribute('data-animate-in-delay') ) {
					d = items[i].getAttribute('data-animate-in-delay') / 2000 + 's';
				} else {
					d = 0;
				}
				el.css('transition-delay', d);
			}
		});
    }
};


}(jQuery, AROSSMN));
