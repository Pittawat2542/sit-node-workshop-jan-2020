const { Router } = require('express');

const postsControllers = require('../controllers/posts-controllers');

const router = Router();

router.get('/', postsControllers.getAllPosts);

router.get('/:postId', postsControllers.getPostById);

router.post('/', postsControllers.createPost);

router.patch('/:postId', postsControllers.updatePost);

router.delete('/:postId', postsControllers.deletePost);

module.exports = router;
