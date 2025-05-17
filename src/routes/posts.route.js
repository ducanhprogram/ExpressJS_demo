const express = require("express");
const router = express.Router();
const postsValidator = require("../validators/posts.validator");

const postsController = require("../controllers/posts.controller");
const attachResourceLoaders = require("@/utils/attachResourceLoaders");
// attachResourceLoaders(router, ["post"]);

router.get("/", postsController.getAllPosts);

router.get("/:post", postsController.getPostsById);

router.post("/", postsValidator.createPost, postsController.createPost);

router.put("/:post", postsValidator.updatePost, postsController.updatePost);

router.put("/:post", postsValidator.updatePost, postsController.updatePost);
router.patch("/:post", postsValidator.updatePost, postsController.updatePost);

router.delete("/:post", postsController.deletePost);

//Post comments
router.get("/:post/comments", postsController.getPostComments);

module.exports = router;

//RESTful API ==> Tiêu chuẩn/quy ước thiết kế API
/*
1. API có pathname rõ ràng là "api", có version
/api/v1/posts
2. Tên tài nguyên là danh từ số nhiều
/api/v1/comments
3. Thể hiện hành động bằng HTTP method ( /api/v1/comments), không thể hiện hành động bàng pathname ko dùng (/api/v1/posts-comments)
     [GET] /api/v1/comments  => Get all comments
     [GET] /api/v1/comments/:id => Get comment by id
    [POST] /api/v1/comments  ==> Create new a comment
    [PUT/PATCH] /api/v1/comments/:id ==> Update comment by id
    [DELETE] /api/v1/comments/:id  ==> Delete comment by id
    [GET] /api/v1/comments?content=tu-khoa ==> tìm kiếm comment theo từ khóa

    [POST] /api/v1/comments/:id/likes  ==> like comment by id
    [DELETE] /api/v1/comments/:id/likes ==> unlike comment by id


    --  Ngoại lệ: 
     [GET] /api/v1/search?q=tu-khoa

4. Thể hiện kết quả bằng HTTP codes

comments: {id: 1, content: "abc", is_active: true, created_at: "2023-10-01", updated_at: "2023-10-01"}
PUT (replace all): /api/v1/comments/1
body: {is_active: false}
=> { id: 1, content: null, is_active: false, created_at: null, updated_at: null }

PATCH (applies partial): /api/v1/comments/1
body: {is_active: false}
=> { id: 1, content: "abc", is_active: false, created_at: "2023-10-01", updated_at: "2023-10-01" }
*/
