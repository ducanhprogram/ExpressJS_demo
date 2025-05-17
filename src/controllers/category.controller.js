const RESOURCE = "categories";
const { readDB, writeDB } = require("../utils/jsonDb");

exports.getAllCategories = async (req, res) => {
    const categories = await readDB(RESOURCE);
    res.json({
        status: "success",
        data: categories,
    });
};

exports.getCategoryById = async (req, res) => {
    const categories = await readDB(RESOURCE);
    const category = categories.find((item) => {
        return item.id === +req.params.id;
    });

    if (!category) {
        res.json({
            status: "error",
            message: "Resource category not found",
        });
        return;
    }

    res.json({
        status: "success",
        data: category,
    });
};

exports.createCategory = async (req, res) => {
    const categories = await readDB(RESOURCE);
    const newCategory = {
        id: (categories[categories.length - 1].id ?? 0) + 1,
        name: req.body.name,
        description: req.body.description,
    };
    categories.push(newCategory);
    await writeDB(RESOURCE, categories);
    res.status(201).json({
        status: "success",
        data: newCategory,
    });
};

exports.updateCategory = async (req, res) => {
    const categories = await readDB(RESOURCE);
    const category = categories.find((item) => {
        return item.id === +req.params.id;
    });
    console.log(category);

    if (!category) {
        res.status(404).json({
            status: "error",
            message: "Resource category not found",
        });
        return;
    }
    Object.assign(category, req.body);
    await writeDB(RESOURCE, categories);
    res.json({
        status: "success",
        data: category,
    });
};

exports.deleteCategory = async (req, res) => {
    const categories = await readDB(RESOURCE);
    const categoryIndex = categories.findIndex((item) => {
        return item.id === +req.params.id;
    });

    if (categoryIndex === -1) {
        res.status(404).json({
            status: "error",
            message: "Resource category not found",
        });
        return;
    }
    categories.splice(categoryIndex, 1);
    await writeDB(RESOURCE, categories);

    res.json({
        status: "success",
        data: "Delete category successfully",
    });
};
