import $ from 'jquery';

class BlogUpdate{
    constructor(){
        this.editButtons = $('.tomc-front-posts--edit');
        this.publishButtons = $('.tomc-front-posts--publish');
        this.unpublishButtons = $('.tomc-front-posts--unpublish');
        this.deleteButtons = $('.tomc-front-posts--delete')
        this.editPostOverlay = $('#tomc-front-post__edit-post-overlay');
        this.closeEditOverlayButton = $('.tomc-front-posts--close-overlay');
        this.titleField = $('#edit-blog--title');
        this.contentField= $('#edit-blog--content_ifr #tinymce');
        this.deletePostOverlay = $('#tomc-front-post__permanently-delete-post-overlay');
        this.saveEditsButton = $('#tomc-front-post--save-edits');
        this.noTitleError = $('#tomc-front-post--edit-errors-title');
        this.noContentError = $('#tomc-front-post--edit-errors-post');
        this.deletePostOverlay = $('#tomc-front-post__permanently-delete-post-overlay');
        this.cancelDeleteButton = $('#tomc-front-post__cancel-permanent-deletion-button');
        this.permanentlyDeleteButton = $('#tomc-front-post__permanently-delete-button');
        this.addPostButton = $('#add-blog-post');
        this.addPostForm = $('#new-blog-post-form');
        this.submitButton = $('#tomc-front-post--submit-blog');
        this.newTitleField = $('#new-blog--title');
        this.newContentField = $('#new-blog--content');
        this.newNoTitleError = $('#tomc-front-post--new-errors-title');
        this.newNoContentError = $('#tomc-front-post--new-errors-post');
        this.events();
        this.editPostOverlayIsOpen = false;
        this.deletePostOverlayIsOpen = false;
        this.deletePostError = $('#tomc-front-post__deletion-error');
        this.postId;
    }

    events(){
        this.editButtons.on('click', this.openEditPostOverlay.bind(this));
        this.deleteButtons.on('click', this.openDeletePostOverlay.bind(this));
        this.publishButtons.on('click', this.publishPost.bind(this));
        this.unpublishButtons.on('click', this.unpublishPost.bind(this));
        this.closeEditOverlayButton.on('click', this.closeEditOverlay.bind(this));
        this.saveEditsButton.on('click', this.saveEdits.bind(this));
        this.cancelDeleteButton.on('click', this.closeDeletePostOverlay.bind(this));
        this.permanentlyDeleteButton.on('click', this.permanentlyDeletePost.bind(this));
        this.addPostButton.on('click', (e)=> {
            this.addPostForm.toggleClass('hidden');
            $(e.target).toggleClass('purple-heading-open');
            $(e.target).toggleClass('purple-heading-closed');
        });
        this.submitButton.on('click', this.submitPost.bind(this));
    }

    submitPost(e){
        const newTitle = this.newTitleField.val();
        const newContent = tinyMCE.get('new-blog--content').getContent();
        if (newTitle != '' && newContent != ''){
            this.noTitleError.addClass('hidden');
            this.noContentError.addClass('hidden');
            $(e.target).addClass('contracting');
            $.ajax({
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
                },
                url: tomcBookorgData.root_url + '/wp-json/tomcFrontBlogs/v1/addPost',
                // url: tomcBookorgData.root_url + '/wp-json/tomcFrontBlogs/v1/uniquifyPostName',
                type: 'POST',
                data: {
                    'title' : newTitle,
                    'content' : newContent
                    // 'title' : newTitle
                },
                success: (response) => {
                    $(e.target).removeClass('contracting');
                    location.reload(true);
                },
                error: (response) => {
                    $(e.target).removeClass('contracting');
                    // console.log(response);
                }
            })
        } else {
            if (newTitle == ''){
                this.noTitleError.removeClass('hidden');
            }
            if (newContent == ''){
                this.noContentError.removeClass('hidden');
            }
        }
    }

    publishPost(e){
        const blogId = $(e.target).parent('.tomc-front-posts--edit-book-options').data('post');
        $(e.target).addClass('contracting');
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
            },
            url: tomcBookorgData.root_url + '/wp-json/tomcFrontBlogs/v1/publishPost',
            type: 'POST',
            data: {
                'post' : blogId
            },
            success: (response) => {
                $(e.target).removeClass('contracting');
                location.reload(true);
            },
            error: (response) => {
                $(e.target).removeClass('contracting');
                // console.log(response);
            }
        })
    }

    unpublishPost(e){
        const blogId = $(e.target).parent('.tomc-front-posts--edit-book-options').data('post');
        $(e.target).addClass('contracting');
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
            },
            url: tomcBookorgData.root_url + '/wp-json/tomcFrontBlogs/v1/unpublishPost',
            type: 'POST',
            data: {
                'post' : blogId
            },
            success: (response) => {
                $(e.target).removeClass('contracting');
                location.reload(true);
            },
            error: (response) => {
                $(e.target).removeClass('contracting');
                // console.log(response);
            }
        })
    }

    saveEdits(e){
        const newTitle = this.titleField.val();
        const newContent = tinyMCE.get('edit-blog--content').getContent();
        if (newTitle != '' && newContent != ''){
            this.noTitleError.addClass('hidden');
            this.noContentError.addClass('hidden');
            $(e.target).addClass('contracting');
            $.ajax({
                    beforeSend: (xhr) => {
                        xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
                    },
                    url: tomcBookorgData.root_url + '/wp-json/tomcFrontBlogs/v1/updatePost',
                    type: 'POST',
                    data: {
                        'post' : this.postId,
                        'title' : newTitle,
                        'content' : newContent
                    },
                    success: (response) => {
                        $(e.target).removeClass('contracting');
                        location.reload(true);
                    },
                    error: (response) => {
                        $(e.target).removeClass('contracting');
                        // console.log(response);
                    }
                })
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

    openDeletePostOverlay(e){
        if (this.deletePostOverlayIsOpen != true){
            this.postId = $(e.target).parent('.tomc-front-posts--edit-book-options').data('post');
            this.deletePostError.addClass('hidden');
            this.deletePostOverlay.addClass("tomc-book-organization__box--active");
            $("body").addClass("body-no-scroll");
        }
    }

    closeDeletePostOverlay(){
        this.deletePostOverlay.removeClass("tomc-book-organization__box--active");
        $("body").removeClass("body-no-scroll");
        this.postId = 0;
        this.deletePostOverlayIsOpen = false;
    }

    permanentlyDeletePost(e){
        $(e.target).addClass('contracting');
            $.ajax({
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
                },
                url: tomcBookorgData.root_url + '/wp-json/tomcFrontBlogs/v1/deletePost',
                type: 'POST',
                data: {
                    'post' : this.postId
                },
                success: (response) => {
                    $(e.target).removeClass('contracting');
                    location.reload(true);
                },
                error: (response) => {
                    $(e.target).removeClass('contracting');
                    this.deletePostError.addClass('hidden');
                }
            })
    }
}

export default BlogUpdate;