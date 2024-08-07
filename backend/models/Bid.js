const mongoose = require('mongoose');

const bidItemSchema = new mongoose.Schema({
  description: String,
  amount: { type: Number, default: 0 }
});

const bidSchema = new mongoose.Schema({
  title: String,
  items: [bidItemSchema],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bidders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  startTime: Date,
  endTime: Date,
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bid', bidSchema);
