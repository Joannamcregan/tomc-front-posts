<?php add_action('rest_api_init', 'tomcFrontPostsRegisterRoute');

function tomcFrontPostsRegisterRoute() {
    register_rest_route('tomcFrontBlogs/v1', 'addPost', array(
        'methods' => 'POST',
        'callback' => 'addPost'
    ));
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
    register_rest_route('tomcFrontBlogs/v1', 'uniquifyPostName', array(
        'methods' => 'POST',
        'callback' => 'uniquifyPostName'
    ));
}

function uniquifyPostName($postname){
    global $wpdb;
    $posts_table = $wpdb->prefix . "posts";

    $query = 'select posts.post_name
    from %i posts
    where posts.post_name = %s
    and posts.post_type = "post"';
    $results = $wpdb->get_results($wpdb->prepare($query, $posts_table, $postname), ARRAY_A);
    if (count($results) > 0){
        return $postname .= str_replace(":", "-", str_replace(' ', '-', date('Y-m-d H:i:s')));
    } else {
        return $postname;
    }
}

function addPost($data){
    $user = wp_get_current_user();
    global $wpdb;
    $userid = $user->ID;
    $title = wp_kses($data['title'], array(
        'a'      => array(
            'href'  => array(),
            'title' => array(),
        ),
        'br'     => array(),
        'em'     => array(),
        'strong' => array(),
        'p' => array()
    ));
    $postname = str_replace("'", "", str_replace(' ', '-', sanitize_text_field($data['title'])));
    $postname = uniquifyPostName($postname);
    $content = wp_kses($data['content'], array(
        'a'      => array(
            'href'  => array(),
            'title' => array(),
        ),
        'br'     => array(),
        'em'     => array(),
        'strong' => array(),
        'p' => array()
    ));
    if (is_user_logged_in() && (in_array( 'administrator', (array) $user->roles ) || in_array( 'creator-member', (array) $user->roles ) )){
        $params = array('post_author' => $userid, 'post_title' => $title, 'post_content' => $content, 'post_name' => $postname);
        wp_insert_post( $params);
        return 'success';
    } else {
        wp_safe_redirect(site_url('/my-account'));
        return 'fail';
    }
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
    $title = wp_kses($data['title'], array(
        'a'      => array(
            'href'  => array(),
            'title' => array(),
        ),
        'br'     => array(),
        'em'     => array(),
        'strong' => array(),
        'p' => array()
    ));
    $content = wp_kses($data['content'], array(
        'a'      => array(
            'href'  => array(),
            'title' => array(),
        ),
        'br'     => array(),
        'em'     => array(),
        'strong' => array(),
        'p' => array()
    ));
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