const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  tags: {
    type: [String],
    required: true
  },
  bookmarks: [
    {
      title: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      icon: {
        type: String
      },
      tag: {
        type: String
      },
      color: {
        type: String
      },
      added: {
        type: Date
        // required: true
      },
      updated: {
        type: Date
      },
      description: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

// pin: {
//   type: Boolean,
//   default: false
// }

module.exports = Start = mongoose.model("start", StartSchema);
