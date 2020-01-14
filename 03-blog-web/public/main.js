async function deleteBlogPost(id) {
    const result = await Swal.fire({
        icon: 'question',
        title: 'Are you sure to delete this post?',
        text: "This action can't be undone",
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sure',
        cancelButtonText: 'Cancel'
    });

    if (result.value) {
        const response = await fetch('http://localhost:3000/api/posts/' + id, {
            method: 'DELETE'
        });
        const data = await response.json();
        const { post } = await data;

        await Swal.fire({
            icon: 'success',
            title: 'Post Deleted!',
            text: 'ID: ' + post.id
        });

        const blogPost = document.querySelector(
            'div[data-postid="' + id + '"]'
        );
        blogPost.remove();
    }
}

function createBlogPost(id, title, body) {
    const blogPost = document.createElement('div');
    blogPost.dataset.postid = id;
    blogPost.classList.add('blog-post');

    const blogPostTitle = document.createElement('h2');
    blogPostTitle.classList.add('blog-post-title');
    blogPostTitle.textContent = title;

    blogPost.appendChild(blogPostTitle);

    const blogPostMeta = document.createElement('p');
    blogPostMeta.classList.add('blog-post-meta');
    blogPostMeta.textContent = new Date().toDateString() + ' by ' + 'Kelvin';

    const blogPostEdit = document.createElement('a');
    blogPostEdit.classList.add('btn');
    blogPostEdit.classList.add('btn-link');
    blogPostEdit.classList.add('ml-3');
    blogPostEdit.href = '/' + id + '/edit';
    blogPostEdit.textContent = 'Edit';

    const blogPostDelete = document.createElement('button');
    blogPostDelete.classList.add('btn');
    blogPostDelete.classList.add('ml-3');
    blogPostDelete.classList.add('btn-link');
    blogPostDelete.onclick = deleteBlogPost.bind(null, id);
    blogPostDelete.style.color = 'red';
    blogPostDelete.textContent = 'Delete';

    blogPostMeta.appendChild(blogPostEdit);
    blogPostMeta.appendChild(blogPostDelete);

    blogPost.appendChild(blogPostMeta);

    const blogPostContent = document.createElement('p');
    blogPostContent.textContent = body;

    blogPost.appendChild(blogPostContent);

    const blogMain = document.querySelector('.blog-main');
    blogMain.appendChild(blogPost);
}

document.addEventListener('DOMContentLoaded', async function() {
    try {
    const response = await fetch('http://localhost:3000/api/posts');
    const data = await response.json();
    const { posts } = await data;
    posts.map(post => createBlogPost(post.id, post.title, post.body));
    if (posts.length === 0) {
        document.querySelector('#loading-message').textContent =
            'No Posts found.';
    } else {
        document.querySelector('#loading-message').remove();
    }
    } catch (err) {
        console.log(err);
    }
});
