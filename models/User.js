const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let user = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  userCredential: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: new Date().toISOString(),
    required: true
  }
});

module.exports = mongoose.model("User", user);
