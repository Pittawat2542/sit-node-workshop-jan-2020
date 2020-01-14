const url = window.location.href.split('/');

document.addEventListener('DOMContentLoaded', async function() {
    let isEditMode = false;
    if (url[url.length - 1] === 'edit') {
        document.querySelector('#topic').textContent = 'EDIT POST';
        document.querySelector('#submit-btn').textContent = 'SAVE';
        isEditMode = true;
        const titleInput = document.querySelector('[name="title"]');
        titleInput.disabled = true;
        titleInput.value = 'Loading...';
        const detailInput = document.querySelector('[name="detail"]');
        detailInput.disabled = true;
        detailInput.textContent = 'Loading...';
        const submitButton = document.querySelector('#submit-btn');
        submitButton.disabled = true;
        const response = await fetch(
            'http://localhost:3000/api/posts/' + url[url.length - 2]
        );
        const data = await response.json();
        const { post } = await data;
        titleInput.value = post.title;
        titleInput.disabled = false;
        detailInput.textContent = post.body;
        detailInput.disabled = false;
        submitButton.disabled = false;
    }

    const form = document.querySelector('#form-post');
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const objFormData = {};
        formData.forEach(function(value, key) {
            objFormData[key] = value;
        });
        const jsonFormData = JSON.stringify(objFormData);
        const submitButton = document.querySelector('#submit-btn');
        submitButton.innerHTML =
            '<div class="spinner-border text-light" role="status"><span class="sr-only">Loading...</span></div>';
        submitButton.disabled = true;
        try {
        const response = await fetch(
            isEditMode
                ? 'http://localhost:3000/api/posts/' + url[url.length - 2]
                : 'http://localhost:3000/api/posts',
            {
                method: isEditMode ? 'PATCH' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonFormData
            }
        );
        const data = await response.json();
        const { post } = await data;

        await Swal.fire({
            icon: 'success',
            title: isEditMode ? 'Saved!' : 'New Post Created!',
            text: 'ID: ' + post.id
        });
        window.location.replace('http://localhost:3000');
        } catch (err) {
            console.log(err);
        }
    });
});
