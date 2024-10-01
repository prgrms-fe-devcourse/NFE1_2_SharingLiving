const express = require("express");
const connectDB = require("./mongoConn");
const app = express();
const cors = require("cors");

connectDB()
  .then(() => {
    console.log("MongoDB 연결 성공");
    app.use(express.json());
    app.use(cors());

    const index = require("./router/index");
    app.use("/api", index); // API 엔드포인트 설정

    app.listen(5000, () => {
      console.log("서버 실행 중: http://127.0.0.1:5000");
    });
  })
  .catch((err) => {
    // 연결 실패 시 프로세스 종료
    console.error("MongoDB 연결 오류:", err);
    process.exit(1);
  });
