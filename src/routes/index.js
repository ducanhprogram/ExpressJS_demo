const express = require("express");
const router = express.Router();

const commentsRouter = require("./comments.route");
const postsRouter = require("./posts.route");
const authRouter = require("./auth.route");
const categoryRouter = require("./category.route");
const productRouter = require("./product.route");
const usersRouter = require("./users.route");
router.use("/comments", commentsRouter);
router.use("/posts", postsRouter);
router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/products", productRouter);
router.use("/users", usersRouter);

module.exports = router;
