//MongoDB System schema for storing in Database

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  groups: [{type: mongoose.Schema.ObjectId, ref: 'Group'}],
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);