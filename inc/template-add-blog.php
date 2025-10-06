<?php get_header();

?><main>
    <div class="banner"><h1 class="centered-text banner-heading-40">New Post</h1></div>
    <br>
    <br>
    <?php $user = wp_get_current_user();
    if (is_user_logged_in()){
        if ((in_array( 'creator-member', (array) $user->roles )) || (in_array( 'administrator', (array) $user->roles ))){
            ?><div class="generic-content">
                <h2 class="centered-text padding-x-20">Add a Blog Post</h2>
                <?php echo do_shortcode('[forminator_form id="6040"]'); ?>
            </div>
        <?php } else {
            ?><p class="centered-text padding-x-20">Only admin and Creator-Members can post blogs. <a href="<?php echo esc_url(site_url('/creators-circle-membership'));?>">Become a Creator-Member</a></p>
        <?php }
    } else {
        ?><p class="centered-text padding-x-20">Only logged-in admin and Creator-Members can post blogs. <a href="<?php echo esc_url(site_url('/my-account'));?>">Login/Register</a></p>
    <?php }
?></main>

<?php get_footer();
?>