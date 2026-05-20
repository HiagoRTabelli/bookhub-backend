const User = require("../models/User")

async function toggleFavorite(req, res) {
    try {
        const user = await User.findById(req.userId)

        const { bookId } = req.body

        const alreadyFavorite =
            user.favorites.includes(bookId)

        if (alreadyFavorite) {
            user.favorites =
                user.favorites.filter(
                    (fav) => fav.toString() !== bookId
                )
        } else {
            user.favorites.push(bookId)
        }

        await user.save()

        res.json(user.favorites)

    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

async function getFavorites(req, res) {
    try {
        const user = await User.findById(req.userId)
            .populate("favorites")

        res.json(user.favorites)

    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

module.exports = {
    toggleFavorite,
    getFavorites,
}