//MongoDB Tag schema for storing in Database

var mongoose = require('mongoose');

var TagSchema = new mongoose.Schema({
    value: String,
    creator: {type: mongoose.Schema.ObjectId, ref: 'User'},
    private: Boolean,
    system: {type: mongoose.Schema.ObjectId, ref: 'System'}
});

module.exports = mongoose.model('Tag', TagSchema);