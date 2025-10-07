import $ from 'jquery';

class BlogUpdate{
    constructor(){
        this.editButtons = $('.tomc-front-posts--edit');
        this.deleteButtons = $('.tomc-front-posts--delete')
        this.events();
    }

    events(){
        this.editButtons.on('click', ()=>{
            console.log('clicked edit');
        })
        this.deleteButtons.on('click', this.deletePost.bind(this));
    }

    deletePost(){
        console.log('deleting the post');
    }
}

export default BlogUpdate;