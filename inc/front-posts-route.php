<?php add_action('rest_api_init', 'tomcFrontPostsRegisterRoute');

function tomcFrontPostsRegisterRoute() {
    register_rest_route('tomcFrontBlogs/v1', 'updatePost', array(
        'methods' => 'POST',
        'callback' => 'updatePost'
    ));
    register_rest_route('tomcFrontBlogs/v1', 'deletePost', array(
        'methods' => 'POST',
        'callback' => 'deletePost'
    ));
    register_rest_route('tomcFrontBlogs/v1', 'publishPost', array(
        'methods' => 'POST',
        'callback' => 'publishPost'
    ));
    register_rest_route('tomcFrontBlogs/v1', 'unpublishPost', array(
        'methods' => 'POST',
        'callback' => 'unpublishPost'
    ));
}

function deletePost($data){
    $user = wp_get_current_user();
    global $wpdb;
    $userid = $user->ID;
    $posts_table = $wpdb->prefix .  "posts";
    $postId = sanitize_text_field($data['post']);
    if (is_user_logged_in() && (in_array( 'administrator', (array) $user->roles ) || in_array( 'creator-member', (array) $user->roles ) )){
        $wpdb->delete(
            $posts_table,
            array('id' => $postId, 'post_author' => $userid));
            return 'success';
    } else {
        wp_safe_redirect(site_url('/my-account'));
        return 'fail';
    }
}

function updatePost($data){
    $user = wp_get_current_user();
    global $wpdb;
    $userid = $user->ID;
    $posts_table = $wpdb->prefix .  "posts";
    $postId = sanitize_text_field($data['post']);
    $title = sanitize_text_field($data['title']);
    $content = sanitize_text_field($data['content']);
    if (is_user_logged_in() && (in_array( 'administrator', (array) $user->roles ) || in_array( 'creator-member', (array) $user->roles ) )){
        $wpdb->update(
            $posts_table, 
            array(
                'post_title' => $title,
                'post_content' => $content
            ), 
            array('id' => $postId, 'post_author' => $userid));
            return 'success';
    } else {
        wp_safe_redirect(site_url('/my-account'));
        return 'fail';
    }
}

function publishPost($data){
    $user = wp_get_current_user();
    global $wpdb;
    $userid = $user->ID;
    $posts_table = $wpdb->prefix .  "posts";
    $postId = sanitize_text_field($data['post']);
    if (is_user_logged_in() && (in_array( 'administrator', (array) $user->roles ) || in_array( 'creator-member', (array) $user->roles ) )){
        $wpdb->update(
            $posts_table, 
            array(
                'post_status' => 'publish'
            ), 
            array('id' => $postId, 'post_author' => $userid));
            return 'success';
    } else {
        wp_safe_redirect(site_url('/my-account'));
        return 'fail';
    }
}

function unpublishPost($data){
    $user = wp_get_current_user();
    global $wpdb;
    $userid = $user->ID;
    $posts_table = $wpdb->prefix .  "posts";
    $postId = sanitize_text_field($data['post']);
    if (is_user_logged_in() && (in_array( 'administrator', (array) $user->roles ) || in_array( 'creator-member', (array) $user->roles ) )){
        $wpdb->update(
            $posts_table, 
            array(
                'post_status' => 'draft'
            ), 
            array('id' => $postId, 'post_author' => $userid));
            return 'success';
    } else {
        wp_safe_redirect(site_url('/my-account'));
        return 'fail';
    }
}