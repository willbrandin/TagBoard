const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let tagBoard = new Schema({
  title: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: new Date().toISOString(),
    required: true
  },
  lastEditDate: {
    type: Date,
    required: false
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  tags: [String]
});

module.exports = mongoose.model("TagBoard", tagBoard);
