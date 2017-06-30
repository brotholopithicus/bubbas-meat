import './style.css';
import template from './templates/events.pug';
import requestify from './requestify';

const eventsContainer = document.querySelector('.events-container');

requestify('/api/events', { method: 'GET' })
  .then(JSON.parse)
  .then(events => events.sort((a, b) => Date.parse(a.date.start) - Date.parse(b.date.end)))
  .then(events => eventsContainer.innerHTML = template({ events }));
