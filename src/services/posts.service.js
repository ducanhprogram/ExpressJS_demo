const { readDB, writeDB } = require("@/utils/jsonDb");
const throw404 = require("@/utils/throw404");
const RESOURCE = "posts";

const getAllPosts = async () => {
    const posts = await readDB(RESOURCE);
    return posts;
};

const getPostsById = async (postId) => {
    const posts = await readDB(RESOURCE);
    const post = posts.find((item) => {
        return item.id === +postId;
    });
    return post ?? null;
};

const createPost = async (data) => {
    const posts = await readDB(RESOURCE);
    const nextId = (posts.at(-1)?.id ?? 0) + 1;
    const post = {
        ...data,
        id: nextId,
    };

    posts.push(post);
    await writeDB(RESOURCE, posts);
    return post;
};

const updatePost = async (id, data) => {
    //data = req.body
    const posts = await readDB(RESOURCE);
    const post = posts.find((item) => {
        return item.id === +id;
    });
    if (!post) {
        return;
    }
    Object.assign(post, data);
    await writeDB(RESOURCE, posts);
    return post;
};

const deletePost = async (id) => {
    const posts = await readDB(RESOURCE);
    const postIndex = posts.findIndex((item) => {
        return item.id === +id;
    });
    if (postIndex === -1) {
        return;
    }
    posts.splice(postIndex, 1);
    await writeDB(RESOURCE, posts);
    return true;
};

const postsService = {
    getAllPosts,
    getPostsById,
    createPost,
    updatePost,
    deletePost,
};

module.exports = postsService;
