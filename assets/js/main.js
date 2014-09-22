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


// Use this variable to set up the common and page specific functions. If you
// rename this variable, you will also need to rename the namespace below.
var Roots = {
  // All pages
  common: {
    init: function() {
   soundManager.setup({
  // where to find flash audio SWFs, as needed
  url: '/assets/js/',
       debugMode: true,
          debugFlash: true,
  onready: function(){
    playBG();
  }
});
    $('#stop-player').click(function(){
      debugger;
  window.soundManager.togglePause();
});

      $('.fancypdf').fancybox({
            'autoSize'      : false,
            'width'         : "80%",
            'height'        : "80%",
            'type'          : 'iframe',
            'aspectRatio'   : true
      });

      $('.navbar-nav>li>a').click(function(){
        $('.navbar-collapse').collapse('hide');
      });



      if ($(window).width() <= 770){
      $.backstretch('../assets/img/bg.jpg');
      $('#background').animate({'opacity': '0'}, 0);
    }
      // JavaScript to be fired on all pages
      $('.vid-container').fitVids();
      $('.vid-thumb').imgLiquid();

      //body class update

      $('a').click(function(){
        link = $(this).attr('href').split('/');
        $('body').removeAttr('class');

        if ( link.length < 3 || link.length == 1){
          $('body').addClass('home');
        } else{
        $('body').addClass(link[1]);
        $('body').addClass(link[3]);
        }
        if ($('#wpadminbar').length) {
          $('body').addClass('logged-in admin-bar');
        };
      });

      function BGResize(){
      window.videoBG = $("#background");
      window.videoBG.fullScreen().center();
      $('#bg-overlay').fullScreen().center();
      };
      BGResize();
      $(window).resize(function(){
        BGResize();
      });
      $('#home-slider').flexslider({
        animation: 'fade',
        animationSpeed: 500,
        directionNav: true,
        controlNav: true
      });

    }
  },
  // Home page
  home: {
    init: function() {
      // JavaScript to be fired on the home page

    }
  },
  shop: {
    init: function() {
      // JavaScript to be fired on the home page

 var ShopifyStoreConfig = {shop:"young-oceans.myshopify.com", collections:[25880931,26665103,26699619]};
 (function() {
 var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
 s.src = "//widgets.shopifyapps.com/assets/shopifystore.js";
 var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
 })();
    }
  },
resources: {
    init: function() {
      // JavaScript to be fired on the home page


    }
  },
   single_discographies: {
    init: function() {

      $(".disco-carou").owlCarousel({

      autoPlay: false, //Set AutoPlay to 3 seconds
      items : 4,
      itemsDesktop : [1199,4],
      itemsDesktopSmall : [979,3],
      itemsMobile: [479, 2]
  });

    }
  },
  discographies: {
    init: function() {

      $(".disco-carou").owlCarousel({

      autoPlay: false, //Set AutoPlay to 3 seconds
      items : 4,
      itemsDesktop : [1199,4],
      itemsDesktopSmall : [979,3],
      itemsMobile: [479, 2]

  });

    }
  },
  discography: {
    init: function(){
      $(".disco-carou").owlCarousel({

      autoPlay: false, //Set AutoPlay to 3 seconds
      items : 4,
      itemsDesktop : [1199,4],
      itemsDesktopSmall : [979,3],
      itemsMobile: [479, 2]

  });

    }
  },
  gallery: {
    init: function(){
      function liquidWrap(){
        $('.insta-photo').addClass('col-sm-6 col-md-4 col-lg-3');
        $('.insta-photo > a').wrap('<div class="img-pad"></div>');
        $('.img-pad').imgLiquid();
      };

      $('.instagram-grid').embedagram({
        instagram_id: 179338873,
        thumb_width: 306,
        limit: 20,
        wrap_tag: 'div class=insta-photo',
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
      itemsDesktopSmall : [979,3],
      itemsMobile: [479, 2]

  });

    }
  },

  blog: {
    init: function() {
      // JavaScript to be fired on the about us page
      $('.blog-img').imgLiquid({verticalAlign: 'top'});
    }
  },

  // About us page, note the change from about-us to about_us.
  post_type_archive_videos: {
    init: function() {
      // JavaScript to be fired on the about us page
       $('.fancyvid').fancybox({
            'autoSize'      : false,
            'width'         : "80%",
            'height'        : "80%",
            'type'          : 'iframe',
            'aspectRatio'   : true
      });
    }
  },

videos: {
    init: function() {
      // JavaScript to be fired on the about us page
       $('.fancyvid').fancybox({
            'autoSize'      : false,
            'width'         : "80%",
            'height'        : "80%",
            'type'          : 'iframe',
            'aspectRatio'   : true
      });
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

