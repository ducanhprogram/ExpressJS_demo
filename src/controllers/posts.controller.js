const RESOURCE = "posts"; // tên resource trong file db.json
const commentsService = require("@/services/comments.service");
const postsService = require("@/services/posts.service");
const { readDB, writeDB } = require("@/utils/jsonDb");
const response = require("@/utils/response");
const throw404 = require("@/utils/throw404");

/*
M - Model
V - View
C - Controller: req, res

*/

exports.getAllPosts = async (req, res) => {
    const posts = await postsService.getAllPosts();
    response.success(res, 200, posts);
};

exports.getPostsById = async (req, res) => {
    const post = await postsService.getPostsById(req.params.id);
    if (!post) throw404();
    const comments = await commentsService.getCommentsByPostId(post.id);
    const result = {
        ...post,
        comments,
    };
    response.success(res, 200, result);
};

exports.createPost = async (req, res) => {
    const post = await postsService.createPost(req.body);
    response.success(res, 201, post);
};

exports.updatePost = async (req, res) => {
    // const posts = await readDB(RESOURCE);
    // const post = posts.find((item) => {
    //     return item.id === +req.params.id;
    // });
    const post = await postsService.updatePost(req.params.id, req.body);

    if (!post) {
        throw404("Not Found");
    }

    response.success(res, 201, post);
};

exports.deletePost = async (req, res) => {
    const resultPost = await postsService.deletePost(req.params.id);

    if (!resultPost) {
        throw404("Not Found");
    }
    res.status(204).send();
};

exports.getPostComments = async (req, res) => {
    const post = await postsService.getPostsById(req.params.id);
    if (!post) {
        throw404();
    }
    const comments = await commentsService.getCommentsByPostId(post.id);
    response.success(res, 200, comments);
};
