const mongoose = require("mongoose")

async function connectDatabase() {
    try {
        console.log("Trying to connect to MongoDB...")

        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "bookhub",
            serverSelectionTimeoutMS: 60000,
        })

        console.log("MongoDB connected to bookhub")
    } catch (error) {
        console.error("MongoDB connection error:", error.message)
    }
}

module.exports = connectDatabase