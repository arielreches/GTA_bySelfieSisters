var mongoose = require('mongoose');

/*
create groups with group creator, usersIn, and Systemsin with the object id's of the 
user and system schemas associated with. This links them back to the schemas so that its easier to access their data and 
not too cumbersome

A query for all groups, including arrays of their systems might be:

Group.find({}).populate('systemsIn').run(function(err, users) {
   do something
});

just have to remember to update all object id references, including systems and users 
*/
var GroupSchema = new mongoose.Schema({
  name: String,
  groupCreator: {type: mongoose.Schema.ObjectId, ref: 'User'},
  usersIn: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  systemsIn: [{type: mongoose.Schema.ObjectId, ref: 'System'}],
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Group', GroupSchema);