<!DOCTYPE html><!--
   _      ___    ____
 /' \   /'___`\ /\  _`\   /'\_/`\
/\_, \ /\_\ /\ \\ \,\L\_\/\      \
\/_/\ \\/_/// /__\/_\__ \\ \ \__\ \
   \ \ \  // /_\ \ /\ \L\ \ \ \_/\ \
    \ \_\/\______/ \ `\____\ \_\\ \_\
     \/_/\/_____/   \/_____/\/_/ \/_/

built by 12South Music
http://12southmusic.com/

 -->
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" <?php language_attributes(); ?>> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" <?php language_attributes(); ?>> <!--<![endif]-->
<html class="no-js" <?php language_attributes(); ?>>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title><?php wp_title('|', true, 'right'); ?></title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <?php

    wp_head();
    echo do_shortcode('[wpv-view name="video-backgrounds"]');
    wp_register_script('roots_activate', get_template_directory_uri() . '/assets/js/main.js', false, null, false);
    wp_enqueue_script('roots_activate');
    echo do_shortcode('[wpv-view name="BACKGROUND MUSIC"]');
  ?>
  <link rel="alternate" type="application/rss+xml" title="<?php echo get_bloginfo('name'); ?> Feed" href="<?php echo home_url(); ?>/feed/">
  <link rel="shortcut icon" href="<?php echo of_get_option('favicon_upload'); ?>" />
  <script type="text/javascript">try{Typekit.load();}catch(e){}</script>
  <script type="text/javascript">
  var ShopifyStoreConfig = {shop:"young-oceans.myshopify.com", collections:[26699619,25880931,26665103]};
  (function() {
    var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
    s.src = "//widgets.shopifyapps.com/assets/shopifystore.js";
    var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
  })();
</script>
<noscript>Please enable javascript, or <a href="http://young-oceans.myshopify.com">click here</a> to visit my <a href="http://www.shopify.com/tour/ecommerce-website">ecommerce web site</a> powered by Shopify.</noscript>
</head>
