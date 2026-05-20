const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const connectDatabase = require("./database")
const favoriteRoutes = require("./routes/favoriteRoutes")
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const bookRoutes = require("./routes/bookRoutes")

dotenv.config()

const app = express()

app.use(cors({
    origin: "*"
}))
app.use(express.json())

app.use("/uploads", express.static("src/uploads"))

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/books", bookRoutes)
app.use("/api/favorites", favoriteRoutes)
app.get("/", (req, res) => {
    res.send("BookHub API is running")
})

connectDatabase()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})