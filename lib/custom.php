<?php

add_shortcode('wpv-next-disco', 'next_disco');
function next_disco(){
	$next_post = get_next_post();
	if (!empty( $next_post )): ?>
  	<a href="<?php echo get_permalink( $next_post->ID ); ?>" class='disco-prev'><i class='fa fa-angle-right'></i></a>
<?php endif;
	}

add_shortcode('wpv-prev-disco', 'prev_disco');
function prev_disco(){
	$prev_post = get_previous_post();
	if (!empty( $prev_post )): ?>
  	<a href="<?php echo get_permalink( $prev_post->ID ); ?>" class='disco-next'><i class='fa fa-angle-left'></i></a>
<?php endif;
	}


add_shortcode('wpv-post-index', 'views_index');
function views_index() {
    global $WP_Views;
    static $i = 0;
    $i ++;
    $paged = $WP_Views->post_query->get('paged') - 1;
    return $paged + $i;
}

add_shortcode('video-id', 'parse_Id');
function parse_Id($atts){
  $defaults_array = array('url' => null);
  shortcode_atts( $defaults_array, $atts );
  $link = $atts['url'];
  preg_match("#(?<=v=)[a-zA-Z0-9-]+(?=&)|(?<=v\/)[^&\n]+(?=\?)|(?<=v=)[^&\n]+|(?<=youtu.be/)[^&\n]+#", $link, $matches);
  return $link;
  return $matches;
  }


define( 'UPLOADS', ''.'assets' );

?>
