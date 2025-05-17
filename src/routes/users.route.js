const express = require("express");

const userController = require("../controllers/user.controller");
const userService = require("@/services/user.service");
const throw404 = require("@/utils/throw404");
const attachResourceLoaders = require("@/utils/attachResourceLoaders");
const router = express.Router();
attachResourceLoaders(router, ["user"]);

// user : id
router.get("/", userController.getList);
router.get("/:user", userController.getOne);
router.post("/", userController.create);
router.put("/:user", userController.update);
router.delete("/:user", userController.remove);

module.exports = router;
