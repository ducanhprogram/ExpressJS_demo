const { checkSchema, validationResult } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

exports.createCategory = [
    checkSchema({
        name: {
            notEmpty: true,
            errorMessage: "Name category is not empty",
        },
        description: {
            optional: true,
            notEmpty: true,
            errorMessage: "Description category is not empty",
        },
    }),
    handleValidationErrors,
];

exports.updateCategory = [
    checkSchema({
        name: {
            notEmpty: true,
            errorMessage: "Name category is not empty",
        },
        description: {
            optional: true,
            notEmpty: true,
            errorMessage: "Description category is not empty",
        },
    }),
    handleValidationErrors,
];
