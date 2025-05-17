const RESOURCE = "products";
const { readDB, writeDB } = require("../utils/jsonDb");

exports.getAllProducts = async (req, res) => {
    const products = await readDB(RESOURCE);
    res.json({
        status: "success",
        data: products,
    });
};

exports.getProductsById = async (req, res) => {
    const products = await readDB(RESOURCE);
    const product = products.find((product) => {
        return product.id === +req.params.id;
    });
    if (!product) {
        res.status(404).json({
            status: "error",
            data: "Resource product not found",
        });
        return;
    }
    res.json({
        status: "success",
        data: product,
    });
};

exports.createProduct = async (req, res) => {
    const products = await readDB(RESOURCE);
    const categories = await readDB("categories");
    const categoryExists = categories.some((cat) => {
        return cat.id === +req.body.categoryId;
    });

    if (!categoryExists) {
        res.status(400).json({
            status: "error",
            message: "Danh mục không tồn tại",
        });
        return;
    }
    const newProduct = {
        id: (products[products.length - 1].id ?? 0) + 1,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        categoryId: req.body.categoryId,
    };
    products.push(newProduct);
    await writeDB(RESOURCE, products);
    res.status(201).json({
        status: "success",
        data: newProduct,
    });
};

exports.updateProduct = async (req, res) => {
    const products = await readDB(RESOURCE);
    const product = products.find((item) => {
        return item.id === +req.params.id;
    });

    if (!product) {
        res.status(404).json({
            status: "error",
            data: "REsource product not found",
        });
        return;
    }
    Object.assign(product, req.body);
    await writeDB(RESOURCE, products);
    res.json({
        status: "success",
        message: product,
    });
};

exports.deleteProduct = async (req, res) => {
    const products = await readDB(RESOURCE);
    const productIndex = products.findIndex((item) => {
        return item.id === +req.params.id;
    });

    if (productIndex === -1) {
        res.status(404).json({
            status: "error",
            message: "Product not found",
        });
    }
    products.splice(productIndex, 1);
    await writeDB(RESOURCE, products);
    res.status(204).send();
};
