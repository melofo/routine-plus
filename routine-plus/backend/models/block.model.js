const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blockSchema = new Schema({
  username: {type: String, required: true}, //by Junfeng
  image: {type: {}, required: true},
  task: {type: String, required: true},
  routine: {type: String, required: true},
  status: { type: String, default: 'Todo'},
  date: {type: Date, required: true},
}, {
  timestamps: true,
});

const Block = mongoose.model('Block', blockSchema);

module.exports = Block;