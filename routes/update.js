const Events = require('../models/Event');

function updateEvents() {
  Events.find({}).then((events) => {
    events.forEach(event => {
      let startDate = Date.parse(event.date.start);
      let endDate = Date.parse(event.date.end);
      if (Date.now() > endDate) {
        const eventLength = endDate - startDate;
        const oneDay = (1000 * 60 * 60 * 24);
        const rFreq = event.date.repeat ? event.date.repeat : null;

        if ((rFreq === 'NR') || !rFreq) {
          Events.findByIdAndRemove(event._id, (err) => {
            if (err) return console.error(`Error: ${err.message}`);
            console.log('Removed Event.');
          });
        } else {
          if (rFreq === 'D') {
            startDate = startDate + oneDay;
          } else if (rFreq === 'W') {
            startDate = startDate + (7 * oneDay);
          } else {
            startDate = startDate + (30 * oneDay);
          }
          event.date.end = startDate + eventLength;
          event.date.start = startDate;
          
          event.save().then((event) => {
            console.log(`Updated Event: ${event}`);
          });
        }
      }
    });
  });
}

module.exports = updateEvents;
