const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Databse Connected Successfully!!");
  } catch (err) {
    console.log("Could not connect to the database", err);
    process.exit();
  }
};
