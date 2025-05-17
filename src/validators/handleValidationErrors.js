const response = require("@/utils/response");
const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    }
    // res.status(422).json({
    //     status: "error",
    //     errors: errors.array().map((error) => {
    //         return {
    //             field: error.path,
    //             message: error.msg,
    //         };
    //     }),
    // });
    const errors = result.array().map((error) => {
        return {
            field: error.path,
            message: error.msg,
        };
    });
    response.error(res, 422, "Unprocessable entity", errors);
};

module.exports = handleValidationErrors;
