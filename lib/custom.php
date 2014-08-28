<?php


add_shortcode('wpv-post-prev', 'views_prev');
function views_prev() {
    global $WP_Views;
    static $i = 0;
    $i ++;
    $paged = $WP_Views->post_query->get('paged') - 2;
    return $WP_Views->post_query->get('posts_per_page') * $paged + $i;
}
add_shortcode('wpv-post-next', 'views_next');
function views_next() {
    global $WP_Views;
    static $i = 0;
    $i ++;
    $paged = $WP_Views->post_query->get('paged');
    return $WP_Views->post_query->get('posts_per_page') * $paged + $i;
}

define( 'UPLOADS', ''.'assets' );

?>
