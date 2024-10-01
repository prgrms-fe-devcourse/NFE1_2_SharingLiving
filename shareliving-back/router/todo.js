const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

let todoList = [
  { id: uuidv4(), text: "리액트 기초 공부하기", status: false },
  { id: uuidv4(), text: "취업 준비하기", status: true },
  { id: uuidv4(), text: "여행가기", status: false },
];

router.get("/", (req, res) => {
  res.send(todoList);
});

router.post("/add", (req, res) => {
  console.log(todoList.length);
  console.log(req.body.text);

  const newItem = {
    id: uuidv4(), // UUID로 고유 id 생성
    text: req.body.text,
    status: false,
  };

  todoList.push(newItem);
  res.send(newItem);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  // todolist에서 해당 id를 가진 항목 찾기
  const todoIndex = todoList.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    // 항목을 찾지 못한 경우
    return res.status(400).json({ message: "Todo not found" });
  }

  // status 값을 새 값으로 업데이트
  todoList[todoIndex].status = status;

  // 업데이트된 todo 항목을 클라이언트에게 전송
  res.send(todoList[todoIndex]);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  // todoList에서 해당 id를 가진 항목을 제외
  todoList = todoList.filter((todo) => todo.id !== id);

  res.send(todoList);
});

module.exports = router;
