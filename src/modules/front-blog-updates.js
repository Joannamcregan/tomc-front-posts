import $ from 'jquery';

class BlogUpdate{
    constructor(){
        this.editButtons = $('.tomc-front-posts--edit');
        this.deleteButtons = $('.tomc-front-posts--delete')
        this.editPostOverlay = $('#tomc-front-post__edit-post-overlay');
        this.closeEditOverlayButton = $('.tomc-front-posts--close-overlay');
        this.titleField = $('#edit-blog--title');
        this.contentField= $('#edit-blog--content_ifr #tinymce');
        this.deletePostOverlay = $('#tomc-front-post__permanently-delete-post-overlay');
        this.events();
        this.editPostOverlayIsOpen = false;
    }

    events(){
        this.editButtons.on('click', this.openEditPostOverlay.bind(this));
        this.deleteButtons.on('click', this.deletePost.bind(this));
        this.closeEditOverlayButton.on('click', this.closeEditOverlay.bind(this));
    }

    openEditPostOverlay(e){
        let postId = $(e.target).parent('.tomc-front-posts--edit-book-options').data('post');
        this.editPostOverlay.attr('data-post', postId);
        this.titleField.val($(e.target).parent('.tomc-front-posts--edit-book-options').data('title'));
        let content = $(e.target).parent('.tomc-front-posts--edit-book-options').data('content');
        console.log(content);
        var editor = tinyMCE.get('edit-blog--content');
        if (editor) {
            editor.setContent(content);
        }
        console.log(this.contentField.val());
        this.editPostOverlay.addClass("tomc-book-organization__box--active");
        $("body").addClass("body-no-scroll");
    }

    closeEditOverlay(e){
        this.editPostOverlay.removeClass("tomc-book-organization__box--active");
        $("body").removeClass("body-no-scroll");
    }

    deletePost(){
        console.log('deleting the post');
    }
}

export default BlogUpdate;