const User = require("./User"),
  TagBoard = require("./TagBoard"),
  mongoose = require("mongoose");

mongoose.set("debug", true);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  dbName: process.env.DATABASE_NAME
});

mongoose.Promise = Promise;

module.exports = {
  User,
  TagBoard
};
