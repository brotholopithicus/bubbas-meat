import flatpickr from './flatpickr';
import requestify from './requestify';

function Form() {
  this.initialize = () => {
    this.submitButton = document.querySelector('button.submit');
    this.date = {
      startDate: flatpickr('#startDate', { enableTime: true }),
      endDate: flatpickr('#endDate', { enableTime: true })
    }
    this.form = document.querySelector('form');
    this.title = document.querySelector('input#title');
    this.description = document.querySelector('input#description');
    this.startDate = document.querySelector('input#startDate');
    this.endDate = document.querySelector('input#endDate');
    this.address = document.querySelector('input#address');
    this.city = document.querySelector('input#city');
    this.state = document.querySelector('select#state');
    this.zip = document.querySelector('input#zip');
    this.link = document.querySelector('input#url');
    this.linkText = document.querySelector('input#text');
    this.submitButton.addEventListener('click', this.submitForm);
    this.formSubmitted = false;
    this.formInputs = document.querySelectorAll('.form-input');

    this.startDate.addEventListener('change', () => this.date.endDate.setDate(this.startDate.value));
  }
  this.submitForm = (e) => {
    e.preventDefault();
    if (this.formSubmitted) return;
    this.formSubmitted = true;
    let formData = {};
    this.formInputs.forEach(input => {
      formData[input.id] = input.value
      input.value = '';
    });

    const options = {
      method: 'POST',
      headers: [{ name: 'Content-Type', value: 'application/json' }],
      data: JSON.stringify(formData)
    }

    requestify('/api/events', options).then(JSON.parse).then(res => {
      const empty = document.querySelector('.empty');
      if (empty) {
        eventsContainer.removeChild(empty);
      }
      const oldElement = document.getElementById(res.event._id);
      if (oldElement) {
        const index = parseInt(oldElement.dataset.index);
        const newElement = createEventElement(res.event, index);
        eventsContainer.replaceChild(newElement, oldElement);
      } else {
        const index = parseInt(eventsContainer.lastChild.dataset.index) + 1;
        const newElement = createEventElement(res.event, index);
        renderElement(newElement, eventsContainer);
      }
      console.log(this);
      this.formSubmitted = false;
    });
  }
}

const form = new Form();
form.initialize();

function editClickHandler(id) {
  requestify(`/api/events/${id}`, { method: 'GET' })
    .then(res => JSON.parse(res).event)
    .then(event => {
      console.log(event);
      form.title.value = event.title;
      form.description.value = event.description;
      form.address.value = event.location.address.street;
      form.city.value = event.location.address.city;
      form.zip.value = event.location.address.zip;
      form.date.startDate.setDate(event.date.start);
      form.date.endDate.setDate(event.date.end);
      if (event.link) {
        form.link.value = event.link.url;
        form.linkText.value = event.link.text;
      }
      const stateSelect = form.state.querySelector(`[selected='true']`);
      if (stateSelect) {
        stateSelect.selected = false;
      }
      form.state.querySelector(`[value='${event.location.address.state}']`).selected = true;
    })
}

function deleteClickHandler(id) {
  requestify(`/api/events/${id}`, { method: 'DELETE' }).then(JSON.parse).then(res => {
    if (res.message === 'OK') {
      window.location.reload();
    } else {
      alert('error deleting that thing you tried to delete.');
    }
  });
}

function createElement(tagName, options) {
  const el = document.createElement(tagName);
  if (typeof options.dataset !== 'undefined') {
    for (let key in options.dataset) {
      el.dataset[key] = options.dataset[key];
    }
  }
  if (typeof options.classList !== 'undefined') el.classList.add(...options.classList);
  if (typeof options.text !== 'undefined') el.textContent = options.text;
  if (typeof options.html !== 'undefined') el.innerHTML = options.html;
  if (typeof options.id !== 'undefined') el.id = options.id;
  if (typeof options.listeners !== 'undefined') options.listeners.forEach(listener => el.addEventListener(listener.event, listener.handler));
  return el;
}

const eventsContainer = document.querySelector('.events');

function generateEventElements(events) {
  let elements = [];
  if (events.length) {
    for (let i = 0; i < events.length; i++) {
      const event = createEventElement(events[i], i + 1);
      elements.push(event);
    }
  } else {
    const emptyEvent = createElement('div', { classList: ['event', 'empty'] });
    const title = createElement('h4', { text: `There's nothing here.` });
    emptyEvent.appendChild(title);
    elements.push(emptyEvent);
  }
  return elements;
}

function createEventElement(eventData, index) {
  const event = createElement('div', { id: eventData._id, classList: ['event'], dataset: { index } });
  const number = createElement('h4', { text: index + '.' });
  const title = createElement('h4', { text: eventData.title });
  const btnContainerOne = createElement('div', { classList: ['btn-container'] });
  const btnContainerTwo = btnContainerOne.cloneNode();
  const editButton = createElement('button', { id: 'editEvent', html: '&plus;', listeners: [{ event: 'click', handler: () => editClickHandler.call(event, eventData._id) }] });
  const removeButton = createElement('button', { id: 'removeButton', html: '&times;', listeners: [{ event: 'click', handler: () => deleteClickHandler.call(event, eventData._id) }] });
  btnContainerOne.appendChild(editButton);
  btnContainerTwo.appendChild(removeButton);
  [number, title, btnContainerOne, btnContainerTwo].forEach(child => event.appendChild(child));
  return event;
}

function renderElement(element, parent) {
  parent.appendChild(element);
}

async function fetchEvents() {
  const events = await requestify('/api/events', { method: 'GET' });
  const elements = generateEventElements(JSON.parse(events));
  elements.forEach(element => renderElement(element, eventsContainer));
}

window.onload = () => fetchEvents();
