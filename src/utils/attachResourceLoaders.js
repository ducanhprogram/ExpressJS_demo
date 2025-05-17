const throw404 = require("./throw404");

//Nếu đổi id : Sẽ không có cơ chế auto loader nữa
//Tên param trùng tên models
const models = {
    user: require("@/models/user.model"),
    // post: require("@/models/post.model"),
};

function attachResourceLoaders(router, params) {
    params.forEach((param) => {
        router.param(param, async (req, res, next, id) => {
            const resource = await models[param].findById(id);
            if (!resource) throw404(`${param} not found`);
            //Lưu thông tin người dung vào req.user
            req[param] = resource;
            next();
        });
    });
}

module.exports = attachResourceLoaders;
