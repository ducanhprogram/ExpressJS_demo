const { readDB, writeDB } = require("@/utils/jsonDb");
const throw404 = require("@/utils/throw404");
const RESOURCE = "comments";

const getCommentsByPostId = async (postId) => {
    const comments = await readDB(RESOURCE);

    return comments.filter((comment) => {
        return comment.post_id === +postId;
    });
};

const commentsService = {
    getCommentsByPostId,
};

module.exports = commentsService;
