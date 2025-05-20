//tầng điều khiển
const userService = require("@/services/user.service");
const response = require("@/utils/response");
const throw404 = require("@/utils/throw404");

exports.getList = async (req, res) => {
    const page = +req.query.page || 1;
    let limit = +req.query.limit || 10;
    let maxList = 50;
    if (limit > maxList) limit = maxList;
    const { items, total } = await userService.getAll(page, limit);
    let last_page = Math.ceil(total / limit);

    response.success(res, 200, {
        items,
        pagination: {
            current_page: parseInt(page),
            per_page: parseInt(limit),
            total: total,
            last_page,
        },
    });
};

exports.getOne = async (req, res) => {
    console.log(req);
    response.success(res, 200, req.user);
};

exports.create = async (req, res) => {
    const data = req.body;
    const newUser = await userService.create(data);
    response.success(res, 201, newUser);
};

exports.update = async (req, res) => {
    //Lấy id
    const id = +req.params.user;
    const data = req.body;
    const updateUser = await userService.update(id, data);
    if (!updateUser) {
        return throw404("User not found or no changes made");
    }
    response.success(res, 200, updateUser);
};

exports.remove = async (req, res) => {
    console.log(req.user);
    await userService.remove(req.user.id);
    response.success(res, 204);
};
