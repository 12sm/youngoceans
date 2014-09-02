/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 *
 * Google CDN, Latest jQuery
 * To use the default WordPress version of jQuery, go to lib/config.php and
 * remove or comment out: add_theme_support('jquery-cdn');
 * ======================================================================== */

//Reload Codes for AJAX are found in the Wordpress dashboard in Settings under AAPL

(function($) {

  var vid;
  function bgVid(url){
    $.okvideo({ source: url, volume: 0, adproof: true });
  }
// Use this variable to set up the common and page specific functions. If you
// rename this variable, you will also need to rename the namespace below.
var Roots = {
  // All pages
  common: {
    init: function() {

      // JavaScript to be fired on all pages
      $('.vid-container').fitVids();
      //$.okvideo({ source: 'https://vimeo.com/103495412', volume: 0, adproof: true });
      $('.vid-thumb').imgLiquid();

      //body class update

      $('a').click(function(){
        link = $(this).attr('href').split('/');
        $('body').removeAttr('class');

        if ( link.length < 3){
          $('body').addClass('home');
        } else{
        $('body').addClass(link[1]);
        $('body').addClass(link[3]);
        }
      });

    }
  },
  // Home page
  home: {
    init: function() {
      // JavaScript to be fired on the home page
      $('#home-slider').flexslider({
        animation: 'fade',
        animationSpeed: 500,
        directionNav: true,
        controlNav: false
      });
      window.alert = function() {console.log('no alert')};
    }
  },

   single_discographies: {
    init: function() {
      //
      vid = $("#vidBG").text();

      if (vid != null) {
        bgVid(vid);
      };

      $(".disco-carou").owlCarousel({

      autoPlay: false, //Set AutoPlay to 3 seconds
      items : 4,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3]

  });

    }
  },
  discography: {
    init: function(){
      $(".disco-carou").owlCarousel({

      autoPlay: false, //Set AutoPlay to 3 seconds
      items : 4,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3]

  });
    }
  },
  photography: {
    init: function(){
      function liquidWrap(){
        $('.col-sm-3 > a').wrap('<div class="img-pad"></div>');
        $('.img-pad').imgLiquid();
      };

      $('.instagram-grid').embedagram({
        instagram_id: 179338873,
        thumb_width: 306,
        limit: 20,
        wrap_tag: 'div class=col-sm-3',
        success: liquidWrap
      });
    }
  },
  discographies: {
    init: function(){
     $(".disco-carou").owlCarousel({

      autoPlay: false, //Set AutoPlay to 3 seconds
      items : 4,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3]

  });
     vid = $("#vidBG").text();

      if (vid != null) {
        bgVid(vid);
      };
    }
  },

  blog: {
    init: function() {
      // JavaScript to be fired on the about us page
      $('.blog-img').imgLiquid({verticalAlign: 'top'});
    }
  },

  // About us page, note the change from about-us to about_us.
  about_us: {
    init: function() {
      // JavaScript to be fired on the about us page
    }
  }
};

// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event
var UTIL = {
  fire: function(func, funcname, args) {
    var namespace = Roots;
    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
      namespace[func][funcname](args);
    }
  },
  loadEvents: function() {
    UTIL.fire('common');

    $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
      UTIL.fire(classnm);
    });
  }
};
//duplicate this and fire it on Ajax calbacks
$(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.

