const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  location: {
    coords: {
      lat: Number,
      lng: Number
    },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String
    }
  },
  link: {
    url: String,
    text: String
  }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
