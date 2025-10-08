<?php
/* 
    Plugin Name: TOMC Front Blog
    Version: 1.0
    Author: Joanna
    Description: Allow Creator-Members and admin to create, edit, publish, and delete blog posts from the frontend
*/

if( ! defined('ABSPATH') ) exit;
require_once plugin_dir_path(__FILE__) . 'inc/front-posts-route.php';

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
        add_action('init', array($this, 'registerScripts'));
        add_action('wp_enqueue_scripts', array($this, 'pluginFiles'));
        add_filter('template_include', array($this, 'loadTemplate'), 99);
    }

    function onActivate() {
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    }

    function registerScripts(){
        wp_register_style('tomc-frontpost_styles', plugins_url('css/blog-post-styles.css', __FILE__), false, '1.0', 'all');
    }

    function pluginFiles(){
        wp_enqueue_style('tomc-frontpost_styles');
        wp_enqueue_script('tomc-frontpost-js', plugin_dir_url(__FILE__) . '/build/index.js', array('jquery'), '1.0', true);
        wp_localize_script('tomc-frontpost-js', 'tomcBookorgData', array(
            'root_url' => get_site_url()
        ));
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