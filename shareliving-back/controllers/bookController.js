const Book = require("../models/book");

// 모든 책 가져오기(GET)
const readBooks = async (req, res) => {
  try {
    // 전체 book 데이터 조회
    const books = await Book.find();
    console.log(books);
    return res.json(books);
  } catch (err) {
    console.error("책 조회 오류:", err);
    throw err;
  }
};

// 특정 책 가져오기(GET)
const readBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res
        .status(404)
        .json({ status: "fail", message: "Book not found" });
    }
    return res.json(book);
  } catch (err) {
    console.error("책 조회 오류:", err);
    throw err;
  }
};

// 책 추가하기(POST)
const addBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    return res.status(201).json(newBook);
  } catch (err) {
    console.error("책 추가 오류:", err);
    throw err;
  }
};

// 책 수정하기(PUT)
const editBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) {
      return res
        .status(404)
        .json({ status: "fail", message: "Book not found" });
    }
    return res.json(updatedBook);
  } catch (err) {
    console.error("책 수정 오류:", err);
    throw err;
  }
};

// 책 삭제하기(DELETE)
const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res
        .status(404)
        .json({ status: "fail", message: "Book not found" });
    }

    return res.status(200).json({ status: "success", message: "Book deleted" });
  } catch (err) {
    console.error("책 삭제 오류:", err);
    throw err;
  }
};

module.exports = { readBooks, readBookById, addBook, editBook, deleteBook };
