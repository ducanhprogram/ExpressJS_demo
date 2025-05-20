//tầng dữ liệu :
// Dữ liệu di chuyển qua các tầng như sau:

// Client → Router → Controller → Service → Model → Database
// Kết quả trả về theo chiều ngược lại: Database → Model → Service → Controller → Client.
const db = require("@/configs/db");

exports.findAll = async (page, limit) => {
    const offset = (page - 1) * limit;
    const [users] = await db.query(
        `select id, first_name,last_name, email, dob, bio,intro, avatar, gender from users order by created_at desc limit ? offset ?`,
        [+limit, +offset]
    );
    return users;
};

exports.count = async () => {
    const [[{ total }]] = await db.query(`select count(*) as total from users`);
    return total;
};

exports.findById = async (id) => {
    const [results] = await db.query(
        `select * from users where id = ? or username = ?`,
        [id, id]
    );
    return results[0];
};

exports.create = async (data) => {
    const allowedFields = [
        "first_name",
        "last_name",
        "email",
        "dob",
        "bio",
        "intro",
        "avatar",
        "gender",
        "username",
    ];
    const createData = Object.keys(data)
        .filter((key) => {
            return allowedFields.includes(key);
        })
        .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {});
    //INSERT INTO users SET first_name = 'Jane', last_name = 'Doe', email = 'jane@example.com', username = 'janedoe', bio = 'Hello, I'm Jane!';  ví dụ
    const [result] = await db.query(`insert into users set ?`, [createData]);
    // insertId: ID của bản ghi vừa được thêm vào (giá trị của trường AUTO_INCREMENT)
    //Nó được trả về bởi thư viện cơ sở dữ liệu (như mysql2) sau khi thực hiện câu lệnh INSERT.
    return {
        id: result.insertId,
        ...createData,
    };
};

exports.update = async (id, data) => {
    const allowedFields = [
        "first_name",
        "last_name",
        "email",
        "dob",
        "bio",
        "intro",
        "avatar",
        "gender",
        "username",
    ];
    const updateData = Object.keys(data)
        .filter((key) => {
            return allowedFields.includes(key);
        })
        .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {});
    const [result] = await db.query(`update users set ? where id = ?`, [
        updateData,
        id,
    ]);
    return result.affectedRows > 0;
};

exports.remove = async (id) => {
    const [results] = await db.query(`delete from users where id = ?`, [id]);
    // của results trả về. affectedRows được trả về bởi thư viện mysql2. Sau khi thực hiện câu lệnh SQL như insert, update, delete. Nó cho biết số lượng bản ghi  trong cơ sở dữ liệu bị ảnh hưởng.
    const affectedRows = results.affectedRows;
    return affectedRows > 0;
};
