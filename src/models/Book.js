const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        cover: {
            type: String,
            required: true
        },

        rating: {
            type: Number,
            default: 0
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Book", bookSchema)