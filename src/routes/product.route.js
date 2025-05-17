const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");
const productValidator = require("../validators/product.validator");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductsById);
router.post(
    "/",
    productValidator.createProduct,
    productController.createProduct
);
router.put(
    "/:id",
    productValidator.updateProduct,
    productController.updateProduct
);
router.delete("/:d", productController.deleteProduct);

module.exports = router;
