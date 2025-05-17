const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

exports.createProduct = [
    checkSchema({
        name: {
            notEmpty: true,
            errorMessage: "Product name is required",
        },
        price: {
            isFloat: { min: 0 },
            errorMessage: "Price must be a positive number",
        },
        categoryId: {
            isInt: { min: 1 },
            errorMessage: "Valid category ID is required",
        },
        description: {
            optional: true,
            notEmpty: true,
            errorMessage: "Description cannot be empty",
        },
    }),
    handleValidationErrors,
];

exports.updateProduct = [
    checkSchema({
        name: {
            optional: true,
            notEmpty: true,
            errorMessage: "Product name cannot be empty",
        },
        price: {
            optional: true,
            isFloat: { min: 0 },
            errorMessage: "Price must be a positive number",
        },
        categoryId: {
            optional: true,
            isInt: { min: 1 },
            errorMessage: "Valid category ID is required",
        },
        description: {
            optional: true,
            notEmpty: true,
            errorMessage: "Description cannot be empty",
        },
    }),
    handleValidationErrors,
];
