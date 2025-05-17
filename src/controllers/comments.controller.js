const RESOURCE = "comments";
const { readDB, writeDB } = require("../utils/jsonDb");

exports.getAllComments = async (req, res) => {
    const comments = await readDB(RESOURCE); // đọc file comment db.json
    res.json({
        status: "success",
        data: comments,
    });
};

exports.getAllCommentsById = async (req, res) => {
    const comments = await readDB(RESOURCE);
    const comment = comments.find((item) => {
        return item.id === +req.params.id;
    });

    if (!comment) {
        res.json({
            status: "error",
            message: "Resource comment not found",
        });
        return;
    }
    res.json({
        state: "success",
        data: comment,
    });
};

exports.createComment = async (req, res) => {
    const comments = await readDB(RESOURCE); // đọc file comment db.json
    const newComment = {
        id: (comments[comments.length - 1].id ?? 0) + 1, // id tự động tăng dần
        comment: req.body.comment,
    };
    comments.push(newComment); // thêm comment vào mảng comments
    await writeDB(RESOURCE, comments);
    res.json({
        status: "success",
        data: newComment,
    });
};

exports.updateComment = async (req, res) => {
    const comments = await readDB(RESOURCE);
    const comment = comments.find((item) => {
        return item.id === +req.params.id;
    });

    if (!comment) {
        res.json({
            status: "error",
            message: "Resource comment not found",
        });
        return;
    }

    comment.comment = req.body.comment;
    await writeDB(RESOURCE, comments);

    res.json({
        status: "success",
        data: comment,
    });
};

exports.deleteComment = async (req, res) => {
    const comments = await readDB(RESOURCE);
    const index = comments.findIndex((item) => {
        return item.id === +req.params.id;
    });

    if (index === -1) {
        res.json({
            status: "error",
            message: "Resource comment not found",
        });
        return;
    }

    comments.splice(index, 1); // xóa 1 phần tử tại index
    await writeDB(RESOURCE, comments);
    res.status(204).send(); // trả về 204 No Content
};
