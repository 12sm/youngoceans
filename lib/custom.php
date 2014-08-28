<?php


add_shortcode('wpv-post-index', 'views_index');
function views_index() {
    global $WP_Views;
    static $i = 0;
    $i ++;
    $paged = $WP_Views->post_query->get('paged') - 1;
    return $WP_Views->post_query->get('posts_per_page') * $paged + $i;
}

define( 'UPLOADS', ''.'assets' );

?>
