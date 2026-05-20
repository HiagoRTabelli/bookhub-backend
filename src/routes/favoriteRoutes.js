const express = require("express")

const authMiddleware = require("../middlewares/authMiddleware")

const {
    toggleFavorite,
    getFavorites,
} = require("../controllers/favoriteController")

const router = express.Router()

router.get(
    "/",
    authMiddleware,
    getFavorites
)

router.post(
    "/",
    authMiddleware,
    toggleFavorite
)

module.exports = router