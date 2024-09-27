const express = require("express");
const router = express.Router();
const todoRouter = require("./todo"); // TODO 라우터 파일 임포트
const bookRouter = require("./book");

router.use("/todo", todoRouter);
router.use("/book", bookRouter);

module.exports = router;
