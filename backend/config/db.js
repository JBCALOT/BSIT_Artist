const mongoose = require("mongoose");

// connect to the database
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`Server is now connected to the Database`);
};

module.exports = connectDB;