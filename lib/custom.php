<?php

// Get the page number into wp_pagenavi
function pagenavi_paged($q) {
  $types = (array)$q->get('post_type');
  if (in_array('discographies', $types)) {
    $paged = get_query_var('paged') ? get_query_var('paged') : 1;
    $q->set('paged', $paged);
  }
}
add_action('pre_get_posts', 'pagenavi_paged');

// Replace wpv-pagination shortcode
function wpv_pagenavi($args, $content) {
  global $WP_Views;
  wp_pagenavi( array('query' => $WP_Views->post_query) );
}
add_shortcode('wpv-pagination', 'wpv_pagenavi');

define( 'UPLOADS', ''.'assets' );

?>
