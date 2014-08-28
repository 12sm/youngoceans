<?php

// Get the page number into wp_pagenavi
function pagenavi_paged($q) {
if (get_query_var('paged')) {
$paged = get_query_var('paged') ? get_query_var('paged') : 1;
$q->set('paged', $paged);
}
}
add_action('pre_get_posts', 'pagenavi_paged');

// Add a custom wp_pagenavi shortcode
function wpv_pagenavi($args, $content) {
global $WP_Views;
wp_pagenavi( array('query' => $WP_Views->post_query) );
}
add_shortcode('wpv-pagenavi', 'wpv_pagenavi');

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
