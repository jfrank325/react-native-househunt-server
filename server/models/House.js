const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    require: true,
  },
  homeType: String,
  description: String,
  price: {
    type: Number,
    required: true,
  },
  image: String,
  yearBuilt: Number,
});

module.exports = mongoose.model('House', HouseSchema);
