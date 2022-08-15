const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
async function connect() {
  try {
    await mongoose.connect(MONGO_URL, (err) => {
      if (err) {
        throw err;
      }
      console.log("connection succeded");
    });
  } catch (err) {
    console.log("error: ", err.message);
  }
}
exports.myConnect = connect;
