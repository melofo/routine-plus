const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blockSchema = new Schema({
  username: {type: String, required: true}, //by Junfeng
  image: {type: {}, required: true},
  task: {type: String, required: true},
  routine: {type: String, required: true},
  status: { type: String, default: 'Backlog'},
  lastUpdateDate: { type: Date, default: new Date(1990,1,14)}, //by junfeng
  date: {type: Date, required: true},
}, {
  timestamps: true,
});

const Block = mongoose.model('Block', blockSchema);

module.exports = Block;