//tầng dịch vụ
const userModel = require("@/models/user.model");

class UserService {
    async getAll(page, limit) {
        const items = await userModel.findAll(page, limit);
        const total = await userModel.count();
        return {
            items,
            total,
        };
    }
    async getById(id) {
        const users = await userModel.findById(id);
        return users;
        // return users[0] ?? null;
    }
    async create(data) {
        return await userModel.create(data);
    }
    async update(id, data) {
        const success = await userModel.update(id, data);
        if (!success) {
            return null;
        }
        return await this.getById(id);
    }
    async remove(id) {
        return await userModel.remove(id);
    }
}

const userService = new UserService();

module.exports = userService;
