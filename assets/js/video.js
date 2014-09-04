<script type="text/javascript">
    var videoBG
      , isiPad = navigator.userAgent.match(/iPad/i) != null
      , videoIndex = 0
      , yoceans_channel = {"c3GN9CqxKAY":{"0":"Bon Iver - Perth (Deluxe)"},"gt8gG9iEjpM":{"0":"Bon Iver - Minnesota, WI (Deluxe)"},"MjxA25Tj1Ks":{"0":"Bon Iver - Holocene (Deluxe)"},"VGAH9ihcWv4":{"0":"Bon Iver - Towers (Deluxe)"},"-XScQyx7jqU":{"0":"Bon Iver - Michicant (Deluxe)"},"ve5dUOWI0q4":{"0":"Bon Iver - Hinnom, TX (Deluxe)"},"KMfL7rVAu0U":{"0":"Bon Iver - Wash. (Deluxe)"},"bKggxiLaBmI":{"0":"Bon Iver - Calgary (Deluxe)"},"tw7ORJOPIt8":{"0":"Bon Iver - Lisbon, OH (Deluxe)"},"wF_Mx2xsdbw":{"0":"Bon Iver - Beth\/Rest (Deluxe)"},"7ssHe4i8yhk":{"0":"Bon Iver - Beth\/Rest (Official Video)"},"t60roHM1t7o":{"0":"Bon Iver - Towers (Official Music Video)"},"TWcyIpul8OE":{"0":"Bon Iver - Holocene (Official Music Video)"},"0KrmxavLIRM":{"0":"Bon Iver - Calgary (Official Music Video)"}}      , yoceans_channel_array = []
      , yoceans_playlist = ''
      , count_vids = 0;

    for (vid_id in yoceans_channel) {
      yoceans_channel_array.push(vid_id);
      if(count_vids >= 1) {
        yoceans_playlist += vid_id + ',';
      }
      count_vids++;
    }

    // formatted as id > (r,g,b) color
    var schemes = {
      'default': {
        'class_name': 'default',
        color: [139, 139, 139]
      },
      'gt8gG9iEjpM': {
        'class_name': 'mnwi',
        color: [163, 220, 109]
      },
      't60roHM1t7o': {
        'class_name': 'towers',
        color: [158, 108, 58]
      },
      'VGAH9ihcWv4': {
        'class_name': 'towers_deluxe',
        color: [231, 148, 121]
      },
      '-XScQyx7jqU': {
        'class_name': 'michicant',
        color: [193, 163, 145]
      },
      've5dUOWI0q4': {
        'class_name': 'hinnom',
        color: [238, 171, 88]
      },
      'KMfL7rVAu0U': {
        'class_name': 'washington',
        color: [165, 162, 181]
      },
      'tw7ORJOPIt8': {
        'class_name': 'lisbon',
        color: [164, 183, 145]
      },
      'wF_Mx2xsdbw': {
        'class_name': 'beth',
        color: [132, 140, 174]
      },
      'c3GN9CqxKAY': {
        'class_name': 'perth',
        color: [107, 205, 245]
      },
      'MjxA25Tj1Ks': {
        'class_name': 'holocene',
        color: [107, 205, 245]
      },
      'bKggxiLaBmI': {
        'class_name': 'calgary',
        color: [107, 205, 245]
      }
    }

    var yoceans_playlist_Length = yoceans_playlist.length;
    yoceans_playlist = yoceans_playlist.slice(0,yoceans_playlist_Length-1);

	$('body').addClass("default");

    var player;

    function onYouTubePlayerAPIReady() {
      $(function(){
player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: yoceans_channel_array[videoIndex],
        playerVars: { 'autoplay': 0, 'controls': 0, 'showinfo' : 0, 'playlist' : yoceans_playlist, 'wmode' : 'transparent'},
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        },
        version: 3
      });
	});
    }

    function change_iframe_player(index) {
      if( !videoBG || !videoBG.is('*') ) {
        return;
      }

      videoBG.html('<div id="player" style="position: absolute; width:100% ; height: 100%;"></div>');

      if(index > yoceans_channel_array.length - 1) {
        videoIndex = 0;
      }
      else if(index < 0) {
        videoIndex = yoceans_channel_array.length - 1;
      }

      videoBG.animate({ "opacity" : "0"},0);

      player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: yoceans_channel_array[videoIndex],
        playerVars: { 'autoplay': 0, 'controls': 0, 'showinfo' : 0},
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        },
        version: 3
      });
    }

    var active_video_id = null
      , a_scheme // active scheme
      , c_scheme
      , video_id;

    function onPlayerStateChange(event) {
      if( event.data == 1 ) {
        if( VID.is_iDevice() && ( $('#background_show.hidden').is('*') || $('#content_container.hidden').is('*') )) {
          $('#background_show').removeClass('hidden')
          $('#content_container').removeClass('hidden');
        }

        video_id = player.getPlaylist()[player.getPlaylistIndex()];

        if( video_id != active_video_id ) {
          // set vars to
          a_scheme = ( schemes[active_video_id] )? schemes[active_video_id] : schemes['default'];
          c_scheme = ( schemes[video_id] )? schemes[video_id] : schemes['default'];

          // handle new color filters
          if( typeof multiplyfilter == 'object' ) {
            // test if color values are the same so the filter doesn't need to run again
            if( multiplyfilter.color.join() != c_scheme.color.join() ) {
              multiplyfilter.color = c_scheme.color;
              if( multiplyfilter.prepared.length > 0 ) {
                multiplyfilter.colorize();
              }
            }
          }

          $('body').removeClass( a_scheme.class_name ).addClass( c_scheme.class_name );

          active_video_id = video_id;
        }

        $("#play_vid").hide(0);
        $("#pause_vid").show(0);
      }

      // ended
      if(event.data == 0) {
        window.playNextVideo();
      }

      // paused
      if( event.data == 2 ) {
        $("#play_vid").show(0);
        $("#pause_vid").hide(0);
      }
    }

    function onPlayerReady(event) {
      videoBG.animate({ "opacity" : "1"},500);

      if(!isiPad) {
        player.playVideo();
        player.mute();
      }
    }

  $.fn.center = function () {
    // changed to "fixed" from "absolute" to prevent video from scrolling -- will have to text this, as I'm sure it was absolute for a reason
    this.css("position","fixed");
    this.css("top", ( $(window).height() - this.height() ) / 2 + "px");
    this.css("left", ( $(window).width() - this.width() ) / 2 + "px");
    return this;
  }

  $.fn.fullScreen = function () {
    var min = {
      width : 955,
      height : 600
    };
    var win = {
      width : $(window).width() + ($(window).width() * .15),
      height : $(window).height() + ($(window).height() * .15)
    };
    var vid_width;
    var vid_height;

    var width_ratio;
    var height_ratio;

    function gcd(a, b) {
      return (b == 0) ? a : gcd (b, a%b);
    }

    var ratio = gcd(955, 600);
    wr = 955 / ratio;
    hr = 600 / ratio;

    if(Math.round((win.width/wr)*hr) > win.height) {
      if( win.width > min.width ) {
        this.width( win.width );
        this.height( Math.round((win.width/wr)*hr) );
      }
      else {
        this.width( min.width );
        this.height( min.height );
      }
    }
    else {
      if( win.height > min.height ) {
        this.height( win.height );
        this.width( Math.round((win.height/hr)*wr) );
      }
      else {
        this.width( min.width );
        this.height( min.height );
      }
    }
    return this;
  }
  </script>
