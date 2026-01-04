<?php global $wpdb;
$users_table = $wpdb->prefix . "users";
$posts_table = $wpdb->prefix . "posts";

get_header();

?><main>
    <?php $user = wp_get_current_user();
    if (is_user_logged_in()){
        if ((in_array( 'creator-member', (array) $user->roles )) || (in_array( 'administrator', (array) $user->roles ))){
            ?><div class="generic-content">
                <h1 class="centered-text purple-heading-closed" id="add-blog-post">Add a Blog Post</h1>
                <div id="new-blog-post-form" class="hidden">
                    <?php echo do_shortcode('[forminator_form id="6040"]'); ?> 
                    <!-- prod= 6040, dev = 314 -->
                </div>
                <h1 class="centered-text">Your Blog Posts</h1>
                <?php $query = "SELECT id, post_title, post_content, post_date, post_status from %i WHERE post_author = %d and post_type = 'post' ORDER BY post_date desc";
                $userid = $user->ID;
                $posts = $wpdb->get_results($wpdb->prepare($query, $posts_table, $userid), ARRAY_A);
                if ($posts){
                ?><div class="third-screen">
                    <?php for($i = 0; $i < count($posts); $i++){
                        ?><div class="tomc-front-posts--post-to-edit page-accent-alt-thin">
                            <p class="centered-text"><strong class="tomc-front-posts--post-to-edit-title tomc-book-options--cursor-pointer"><?php echo $posts[$i]['post_title']; ?></strong></p>
                            <div class='flex flex-wrap justify-content-center tomc-front-posts--edit-book-options' data-post='<?php echo $posts[$i]["id"]; ?>' data-title='<?php echo $posts[$i]["post_title"]; ?>' data-content='<?php echo esc_html($posts[$i]["post_content"]); ?>'>
                                <button class="tomc-front-posts--edit">edit</button>
                                <?php if ($posts[$i]['post_status'] == 'publish'){
                                    ?><button class="tomc-front-posts--unpublish">unpublish</button>
                                <?php } else {
                                    ?><button class="tomc-front-posts--publish">publish</button>
                                    <button class="tomc-front-posts--delete">delete</button>
                                <?php }                                
                            ?></div>
                        </div>
                    <?php }

                    ?><div class="tomc-book-organization__overlay" id="tomc-front-post__edit-post-overlay">
                        <div class="overlay-main-container">
                            <br>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 30 30" class="tomc-book-organization__overlay__close tomc-front-posts--close-overlay">
                                <image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABWVJREFUWEfNmHtQ1FUUx7+/H08BRRTDMTABETXGhMxEBZTl5UiLzqRhY2EN5pj5ABSyIRBtGmiC1IqaMCUtGZRpUBoNZbd4+MhHUKZoiPkg0RRBVAwEbnN+Kz9h2XV/v90d2/PPzu7ee87nnnPvuedcDhYuXG++zKCwSJ5nC1k3AsGBf7LsjFiO8YzfuaaybE+PbREwK0SRB4b4Jwul11phSoUqlv4VAD8KDo1g4EotBE7A4Dj2anK5ukAAzAoK2w6OvWZJgIyxk+9WqidpAIMVfwLw0QVoY28Hryn+aL1+E4215822BjtHB3hPfR6NtXVobrimS29LSoXKRQMYojgPBm9do0KXxcE7MACMMRzc+DUunTxlMiQtWpm+CkM8RqCzowO713yIu03NffRyQGtyhcrZIOCs5KVwnzBWmEzKSjZsxs2/rhgNyfE8Ile/BY8J4zQ6GEPR2iw0NzQaB+g4dDDmZCTBYfAgQUFbSyuK07Nxr6nFKMhpi+ZhfNh0ce7xXT+gZu/Bfroke5Bmuo5yR3TqClBoSG5dvoq96zfiwb/tsiD9omYgcOFccc5Z9WFUbi3UqUMWIGnwmDgekYmLQSEiuVJzBqU5eWDd3ZIgRwb4ISIhHhynSb2Xa07jQM4WvfNlA5LScYppmP7GfBHo9MFKHP6myCDg0FHuUL6/EtZ2tsJY2sMlH2xGZ3uH3rlGAZK2ybFKPBetEBUf2fE9/igt12vI0cUZMeuTQJ8kd27cwp51Obh/+85jF2Y0IDgOinfi4PWiv+YQdnfjwCdbcLn6dD+D5DHyHHmQpP1um7B3W65eN+h14wEBWNnYYPZ7y+Dm4ykYosNSsmETmi79LRqmvRaeEI9nAvyE37oedGJf5ue4du6CQTgaYBIgKbB3coRyXQKchw8TDN671YLi9By0Nd8WvtNppVOrcTOD6rN8XPilRhKcWQBJySA3V8SsS4T9QEfB8M2LDYInxwRNBuW7Hjn6XTFO7f9JMpzZAEkRhZnCTWEnuVF/Ca6eHmI6ogNEB0mumBzi3gY9J09E2PJFVCP14bh44neUbdoq3ONyxayAZHxq3Mt4NjxI5KArsTBxPTo7HshlE8abFdDFfTiUaatg6zCgD8yxwhL8VlL2/wJSERGTkQinoS7iiRVDzRjUuTtQf+SkbEizeJCKh5dSV4iJmHJdafZXCJgbieG+mvKSftuflYvGs/WyIE0G5K14RCT1revUudtRf+RX2Dk5IEbIkU8JUO332rA3Q9oN0rMKkwGD4mMxdkag6BXt/aadI6XewWYB9I+JwKR5s0W4WvUhVG3d1S+EbmO8MHst5Uhr4T8pVYzJgKOnTcLMpY8aQEN1IfUzoW+/LuZIQ3WgSYAjxvuAehTe2krjkYdX2+PqOho3URmOF+ZHP/K46hCqtvX3eO8QyN6D2rmOurA9VBy0tEo6ncGLF8A3ZIrePautRBagdq7raLsv1HV6+lmdwLyVFaLWLMHTfr5ivnxcjpQMqJ3ruru6sD/rC1w9UyfJc70H0U1DNw5Fw1COlAwYtXqJ0DD1yM9ffou6quOy4XomOLkOwZyMRAxwHijmyOK0bOHlQvYepDShTFspzjtRtA/Vxaa/MQ3zGono1OWwttU0UefKj6Iir0A+IIXklY9TYT/ICVI7OKmupTaUehuCPJS/G2fKqvQDZgYr6jnAS5dyKkSdXF1wu/EfqbYlj6OF29jZCp2eoVNcAAbhwdCCpDqlQhXw8PltphLgxWdXi4Dk2Jsp5eptj56Ag8J2gmMLLAKO4ceUStUsYtF6RFfE8hwSGdhogHvCj+iCa+o5xj5NrlTn9ziqb5djEe7rC/EfEN2XR0giN+8AAAAASUVORK5CYII=" x="0" y="0" width="30" height="30" alt="X close icon" />
                            </svg>
                            <h2 class="centered-text">Edit Your Blog Post</h2>
                            <label for="edit-blog--title">Blog Post Title</label>
                            <input type="text" id="edit-blog--title"></input>
                            <label for="edit-blog--content">Blog Post Content</label>
                            <?php $content = '';
                                $editor_id = 'edit-blog--content';
                                $settings = array( 
                                    'wpautop' => false, 
                                    'media_buttons' => false, 
                                    'quicktags' => array(
                                            'buttons' => 'strong,em,del,ul,ol,li,block,close'
                                        ),
                                );
                            wp_editor( $content, $editor_id, $settings ); ?>
                            <div class="tomc-front-post--form-div tomc-front-post--red-text centered-text" id="tomc-front-post--edit-basic-info-errors">
                                <p class="hidden" id="tomc-front-post--edit-errors-title">Your blog post's title cannot be blank.</p>
                                <p class="hidden" id="tomc-front-post--edit-errors-post">Your blog post cannot be blank.</p>
                            </div>
                            <button class="tomc-front-posts--save-button" id="tomc-front-post--save-edits">save</button>
                        </div>
                    </div>    

                    <div class="tomc-book-organization__overlay" id="tomc-front-post__permanently-delete-post-overlay">
                        <div class="overlay-main-container">
                            <p class="centered-text" id="tomc-front-post__permanent-deletion-warning-message">Are you sure you want to permanently delete this blog post?</p>
                            <button id="tomc-front-post__permanently-delete-button">Yes, delete this post</button>
                            <p class="red-text centered-text hidden" id="tomc-front-post__deletion-error">We're sorry! Something went wrong. Please try again later.</p>
                            <button id="tomc-front-post__cancel-permanent-deletion-button" class="tomc-book-organization--cancel-button">Cancel</button>
                        </div>
                    </div>

                </div>
            <?php } else {
                ?><div class="generic-content">
                    <p class="centered-text">Looks like you haven't added any blog posts yet.</p>
                </div>
            <?php }
            ?></div>
        <?php } else {
            ?><p class="centered-text padding-x-20">Only admin and Creator-Members can post blogs. <a href="<?php echo esc_url(site_url('/own'));?>">Join our cooperative</a> as a Creator-Member.</p>
        <?php }
    } else {
        ?><p class="centered-text padding-x-20">Only logged-in admin and Creator-Members can post blogs. <a href="<?php echo esc_url(site_url('/my-account'));?>">Login/Register</a></p>
    <?php }
?></main>

<?php get_footer();
?>