const express = require("express");
const router = express.Router();

const commentsController = require("../controllers/comments.controller");

// readDB("comments").then((comment) => {
//     console.log(comment);
// });

// [GET] / comments
router.get("/", commentsController.getAllComments);

//[GET] /comments/:id
router.get("/:id", commentsController.getAllCommentsById);

// [POST] / comments
//POST lên thì nằm ở body
router.post("/", commentsController.createComment);

//[PUT] /coments/:id
router.put("/:id", commentsController.updateComment);

//[DELETE] /coments/:id
router.delete("/:id", commentsController.deleteComment);

module.exports = router;
