import './style.css';

const events = document.querySelectorAll('.event');

events.forEach(evt => {
  if (evt.dataset.event) {
    const datetime = evt.querySelector('#datetime');
    const evtDate = getEventDate(evt);
    datetime.textContent = evtDate;
    renderLinks(evt);
  } else {
    return;
  }
});

function renderLinks(evt) {
  const evtLinks = evt.querySelector('.event-links');
  const uri = addEventDirections(evt.dataset.event);
  const linkOne = generateLink(uri, 'Get Directions');
  evtLinks.appendChild(linkOne);
  const parsedEvent = JSON.parse(evt.dataset.event);
  if (parsedEvent.link) {
    const linkTwo = generateLink(parsedEvent.link.url, parsedEvent.link.text);
    evtLinks.appendChild(linkTwo);
  }
}

function generateLink(uri, text) {
  const linkDiv = document.createElement('div');
  linkDiv.classList.add('contact');
  const link = document.createElement('a');
  link.href = uri;
  link.classList.add('contect');
  link.textContent = text;
  link.target = '_blank';
  linkDiv.appendChild(link);
  return linkDiv;
}

function addEventDirections(evt) {
  evt = JSON.parse(evt);
  const baseUrl = 'https://www.google.com/maps/dir/';
  let eventLocationString = '/';
  for (let key in evt.location.address) {
    eventLocationString += evt.location.address[key] + ',';
  }
  return encodeURI(baseUrl + eventLocationString);
}

function getEventDate(evt) {
  evt = JSON.parse(evt.dataset.event);
  return generateHumanDate(new Date(evt.date));
}

function generateHumanDate(d) {
  let hours = d.getHours();
  let tod = hours >= 12 ? 'PM' : 'AM';
  hours = formatHours(hours);
  let minutes = formatMinutes(d.getMinutes());
  let date = d.toDateString();
  return `${date}, ${hours}:${minutes} ${tod}`;
}

function formatHours(hours) {
  if (hours > 12) {
    return ('0' + Math.abs(12 - hours)).slice(-2);
  } else {
    return ('0' + hours).slice(-2);
  }
}

function formatMinutes(minutes) {
  return ('0' + minutes).slice(-2);
}
