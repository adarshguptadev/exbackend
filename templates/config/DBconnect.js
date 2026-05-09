module.exports = `const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB Connection Failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectToDb;
`;