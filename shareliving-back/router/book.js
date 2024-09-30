const express = require("express");
const {
  readBooks,
  readBookById,
  addBook,
  editBook,
  deleteBook,
} = require("../controllers/bookController");
const router = express.Router();

router.get("/", readBooks);
router.get("/:id", readBookById);
router.post("/new", addBook);
router.put("/edit/:id", editBook);
router.delete("/delete/:id", deleteBook);

module.exports = router;
