const express = require("express")

const authMiddleware = require("../middlewares/authMiddleware")
const adminMiddleware = require("../middlewares/adminMiddleware")
const upload = require("../middlewares/uploadMiddleware")

const {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
} = require("../controllers/bookController")

const router = express.Router()

router.get("/", getBooks)

router.get("/:id", getBookById)

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    upload.single("cover"),
    createBook
)

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    upload.single("cover"),
    updateBook
)

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteBook
)

module.exports = router