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


define( 'UPLOADS', ''.'assets' );

?>
