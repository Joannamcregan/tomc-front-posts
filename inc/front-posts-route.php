<?php add_action('rest_api_init', 'tomcFrontPostsRegisterRoute');

function tomcFrontPostsRegisterRoute() {
    register_rest_route('tomcFrontBlogs/v1', 'updatePost', array(
        'methods' => 'POST',
        'callback' => 'updatePost'
    ));
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