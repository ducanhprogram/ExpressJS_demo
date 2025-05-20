require("module-alias/register");
const express = require("express");
const router = require("@/routes");
const handleNotFound = require("@/middewares/errors/handleNotFound");
const handleErrors = require("@/middewares/errors/handleErrors");
const responseEnhancer = require("@/middewares/responseEnhancer");
const app = express();
const port = 3000;

//Đăng ký middleware
app.use(express.json()); // Middleware to parse JSON body
// để đọc req.body nếu là JSON

app.use(responseEnhancer);

app.use("/api/v1", router); //Gắn tuyến đường

//Handle 404
app.use(handleNotFound);

//Handle errors
app.use(handleErrors);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

// 1. Chuẩn hóa response (success, error)  ==> Tạo utils response
//2. Cơ chế (middeware) báo lỗi 404 ==> Trả về JSON
//3. Cơ chế xử lý exception chung  ==> Trả về JSON
//4. Thêm service layer
//5. Viết API cho quân hệ 1-n (posts và comments)
