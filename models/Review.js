const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  name: String,
  quote: String,
  show: { type: Boolean, default: false }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
