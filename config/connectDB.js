const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(process.env.MONGO_CLOUD_URI).then(() => {
    console.log(`Connected to mongoDB ✓`);
  });
};
