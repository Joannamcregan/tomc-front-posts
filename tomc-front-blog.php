<?php
/* 
    Plugin Name: TOMC Front Blog
    Version: 1.0
    Author: Joanna
    Description: Allow Creator-Members and admin to create, edit, publish, and delete blog posts from the frontend
*/

if( ! defined('ABSPATH') ) exit;

class TOMCFrontBlog {
    function __construct() {
        global $wpdb;         
        $this->charset = $wpdb->get_charset_collate();
        $this->users_table = $wpdb->prefix . "users";
        $this->posts_table = $wpdb->prefix . "posts";

        wp_localize_script('tomc-isbn-js', 'tomcBookorgData', array(
            'root_url' => get_site_url()
        ));
        add_action('activate_tomc-front-blog/tomc-front-blog.php', array($this, 'onActivate'));

        add_filter('template_include', array($this, 'loadTemplate'), 99);
    }

    function onActivate() {
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    }

    function loadTemplate($template){
        if (is_page('add-blog-post')){
            return plugin_dir_path(__FILE__) . 'inc/template-add-blog.php';
        } else if (is_page('my-blog-posts')){
            return plugin_dir_path(__FILE__) . 'inc/template-my-blogs.php';
        }  else
        return $template;
    }
}

$tomcFrontBlog = new TOMCFrontBlog();