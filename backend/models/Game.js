const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    enum: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile', 'Other'],
    default: 'PC'
  },
  status: {
    type: String,
    enum: ['Wishlist', 'Playing', 'Completed', 'Dropped'],
    default: 'Wishlist'
  },
  genre: {
    type: String,
    default: 'Action'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  hoursPlayed: {
    type: Number,
    default: 0
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Game', gameSchema);