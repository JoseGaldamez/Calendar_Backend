const mongoose = require("mongoose");

const DBConnection = async () => {
    try {
        await mongoose.connect( process.env.MONGO_CNN );
        console.log("DB connected");
    } catch (error) {
        console.log(error);
        throw new Error('Error connecting DB');
    }
}

module.exports = DBConnection;