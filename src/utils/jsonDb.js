const fs = require("fs").promises; // sử dụng fs để đọc file json

const DB_FILE = "./db.json"; // đường dẫn tới file db.json
async function readDB(resource, defaultValue = []) {
    try {
        const jsonDB = await fs.readFile(DB_FILE, "utf-8");
        return JSON.parse(jsonDB)[resource] ?? defaultValue; // chuyển đổi jsonDB thành object
    } catch (error) {
        return [];
    }
}

async function writeDB(resource, data) {
    let db = {};
    try {
        const jsonDB = await fs.readFile(DB_FILE, "utf-8");
        console.log(jsonDB);
        db = JSON.parse(jsonDB);
        console.log("Write file successfully!");
    } catch (error) {}
    db[resource] = data;
    await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2)); // ghi dữ liệu vào file db.json
}

module.exports = {
    readDB,
    writeDB,
};
