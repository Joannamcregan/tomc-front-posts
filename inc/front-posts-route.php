<?php add_action('rest_api_init', 'tomcBookorgRegisterRoute');

function tomcFrontPostsRegisterRoute() {
    register_rest_route('tomcBookorg/v1', 'updatePost', array(
        'methods' => 'POST',
        'callback' => 'updatePost'
    ));
}