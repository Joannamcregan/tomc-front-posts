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
        this.saveEditsButton = $('#tomc-front-post--save-edits');
        this.noTitleError = $('#tomc-front-post--edit-errors-title');
        this.noContentError = $('#tomc-front-post--edit-errors-post');
        this.events();
        this.editPostOverlayIsOpen = false;
        this.postId;
    }

    events(){
        this.editButtons.on('click', this.openEditPostOverlay.bind(this));
        this.deleteButtons.on('click', this.deletePost.bind(this));
        this.closeEditOverlayButton.on('click', this.closeEditOverlay.bind(this));
        this.saveEditsButton.on('click', this.saveEdits.bind(this));
    }

    saveEdits(e){
        const newTitle = this.titleField.val();
        const newContent = tinyMCE.get('edit-blog--content').getContent();
        console.log('new title is ' + newTitle);
        console.log('new content is ' + newContent);
        console.log('post id is ' + this.postId);
        if (newTitle != '' && newContent != ''){
            this.noTitleError.addClass('hidden');
            this.noContentError.addClass('hidden');
            $(e.target).addClass('contracting');
            // $.ajax({
            //         beforeSend: (xhr) => {
            //             xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
            //         },
            //         url: tomcBookorgData.root_url + '/wp-json/tomcFrontBlogs/v1/updatePost',
            //         type: 'POST',
            //         data: {
            //             'postId' : postId,
            //             'title' : newTitle,
            //             'content' : newContent
            //         },
            //         success: (response) => {
            //             $(e.target).removeClass('contracting');
            //             location.reload(true);
            //         },
            //         error: (response) => {
            //             $(e.target).removeClass('contracting');
            //             // console.log(response);
            //         }
            //     })
        } else {
            if (newTitle == ''){
                this.noTitleError.removeClass('hidden');
            }
            if (newContent == ''){
                this.noContentError.removeClass('hidden');
            }
        }
    }

    openEditPostOverlay(e){
        if (this.editPostOverlayIsOpen != true){
            this.postId = $(e.target).parent('.tomc-front-posts--edit-book-options').data('post');
            this.titleField.val($(e.target).parent('.tomc-front-posts--edit-book-options').data('title'));
            let content = $(e.target).parent('.tomc-front-posts--edit-book-options').data('content');
            var editor = tinyMCE.get('edit-blog--content');
            if (editor) {
                editor.setContent(content);
            }
            this.noTitleError.addClass('hidden');
            this.noContentError.addClass('hidden');
            this.editPostOverlay.addClass("tomc-book-organization__box--active");
            $("body").addClass("body-no-scroll");
        }
    }

    closeEditOverlay(e){
        this.editPostOverlay.removeClass("tomc-book-organization__box--active");
        $("body").removeClass("body-no-scroll");
        this.postId = 0;
        this.editPostOverlayIsOpen = false;
    }

    deletePost(){
        console.log('deleting the post');
    }
}

export default BlogUpdate;