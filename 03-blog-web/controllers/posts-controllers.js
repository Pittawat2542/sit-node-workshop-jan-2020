const Post = require('../models/Post');

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.getAll();
        res.json({ posts });
    } catch (error) {
        console.log(error);
    }
};

const getPostById = async (req, res, next) => {
    const { postId } = req.params;
    try {
        const post = await Post.getById(postId);
        res.json({ post });
    } catch (error) {
        console.log(error);
    }
};

const createPost = async (req, res, next) => {
    const { title, detail } = req.body;
    // ADD Validation
    const newPost = new Post(
        title,
        detail,
        '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000'
    );
    try {
        await newPost.save();
        res.json({ post: newPost });
    } catch (error) {
        console.log(error);
    }
};

const updatePost = async (req, res, next) => {
    const { postId } = req.params;
    const { title, detail } = req.body;
    try {
        const updatedPost = await Post.getById(postId);
        updatedPost.title = title;
        updatedPost.body = detail;
        const result = await Post.updateById(postId, updatedPost);
        res.json({post: updatedPost});
    } catch (error) {
        console.log(error);
    }
};

const deletePost = async (req, res, next) => {
    const { postId } = req.params;
    try {
        const deletedPost = await Post.getById(postId); 
        const result = await Post.deleteById(postId);
        res.json({post: deletedPost})
    } catch(error) {
        console.log(error)
    }
};

exports.getAllPosts = getAllPosts;
exports.getPostById = getPostById;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
