const Book = require("../models/Book")

async function createBook(req, res) {
    try {
        const { title, category, description, rating } = req.body

        let cover = req.body.cover

        if (req.file) {
            cover = `http://localhost:5000/uploads/${req.file.filename}`
        }

        if (!cover) {
            return res.status(400).json({
                message: "Book cover is required"
            })
        }

        const book = await Book.create({
            title,
            category,
            description,
            cover,
            rating,
            createdBy: req.userId
        })

        res.status(201).json(book)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

async function getBooks(req, res) {
    try {
        const books = await Book.find().sort({ createdAt: -1 })

        res.json(books)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

async function getBookById(req, res) {
    try {
        const book = await Book.findById(req.params.id)

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            })
        }

        res.json(book)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

async function deleteBook(req, res) {
    try {
        const book = await Book.findById(req.params.id)

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            })
        }

        await book.deleteOne()

        res.json({
            message: "Book deleted"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



async function updateBook(req, res) {
    try {
        const { title, category, description, rating } = req.body

        const book = await Book.findById(req.params.id)

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            })
        }

        let cover = book.cover

        if (req.file) {
            cover = `http://localhost:5000/uploads/${req.file.filename}`
        }

        book.title = title || book.title
        book.category = category || book.category
        book.description = description || book.description
        book.rating = rating || book.rating
        book.cover = cover

        await book.save()

        res.json(book)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
}