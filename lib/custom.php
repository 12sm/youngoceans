<?php

add_shortcode('wpv-next-disco', 'next_disco');
function next_disco(){
	$next_post = get_next_post();
	if (!empty( $next_post )): ?>
  	<a href="<?php echo get_permalink( $next_post->ID ); ?>"><i class='fa fa-angle-right'></i></a>
<?php endif;
	}

add_shortcode('wpv-prev-disco', 'prev_disco');
function prev_disco(){
	$prev_post = get_previous_post();
	if (!empty( $prev_post )): ?>
  	<a href="<?php echo get_permalink( $next_post->ID ); ?>"><i class='fa fa-angle-left'></i></a>
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

define( 'UPLOADS', ''.'assets' );

?>
