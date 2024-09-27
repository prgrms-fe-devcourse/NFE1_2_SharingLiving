const mongoose = require("mongoose");
// MongoDB 연결 설정
const mongoURI = "mongodb://<username>:<password>@<host>:<port>/<database>";
const connectDB = () => {
  return mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
module.exports = connectDB;
