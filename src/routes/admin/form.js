import flatpickr from './flatpickr';
import requestify from './requestify';

function Form() {
  this.initialize = () => {
    this.submitButton = document.querySelector('button.submit');
    this.date = {
      startDate: flatpickr('#startDate', { enableTime: true, minDate: Date.now() }),
      endDate: flatpickr('#endDate', { enableTime: true, minDate: Date.now() })
    }
    this.form = document.querySelector('form');
    this.title = document.querySelector('input#title');
    this.description = document.querySelector('input#description');
    this.startDate = document.querySelector('input#startDate');
    this.endDate = document.querySelector('input#endDate');
    this.address = document.querySelector('input#address');
    this.city = document.querySelector('input#city');
    this.state = document.querySelector('input#state');
    this.zip = document.querySelector('input#zip');
    this.link = document.querySelector('input#url');
    this.linkText = document.querySelector('input#text');
    this.submitButton.addEventListener('click', this.submitForm);
    this.formSubmitted = false;
    this.formInputs = document.querySelectorAll('input');

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
      console.log(res);
      // const update = document.querySelector(`.event#${res.event._id}`);
      renderElement(res.event);
    });

  }
}

const form = new Form();
form.initialize();

const deleteButtons = document.querySelectorAll('button#removeEvent');
deleteButtons.forEach(button => button.addEventListener('click', deleteClickHandler));

const editButtons = document.querySelectorAll('button#editEvent');
editButtons.forEach(button => button.addEventListener('click', editClickHandler));

function getEventJSONFromParentNode(target) {
  return JSON.parse(target.parentNode.parentNode.dataset.event);
}

function editClickHandler(e) {
  const data = getEventJSONFromParentNode(e.target);
  form.title.value = data.title;
  form.description.value = data.description;
  flatpickr_input.setDate(new Date(data.date));
  form.address.value = data.location.address.street;
  form.city.value = data.location.address.city;
  form.state.value = data.location.address.state;
  form.zip.value = data.location.address.zip;
  if (typeof data.link !== 'undefined') {
    form.addLink();
    form.link.value = data.link.url;
    form.linkText.value = data.link.text;
  } else {
    if (form.linkInputs) {
      form.link.value = '';
      form.linkText.value = '';
      form.modifyElementStatus(form.link, false);
      form.modifyElementStatus(form.linkText, false);
      console.log(form.link);
      form.hideLink();
    }
  }
  form.formInputs.forEach(input => form.formSwitch(input));
  form.checkFormSubmitReady();
}

function deleteClickHandler(e) {
  console.log('deleting....');
  const eventId = getEventJSONFromParentNode(e.target)._id;
  const url = `/api/events/${eventId}`;
  requestify(url, { method: 'DELETE' }).then(JSON.parse).then(res => {
    if (res.message === 'OK') {
      window.location.reload();
    } else {
      alert('error deleting that thing you tried to delete.');
    }
  });
}

function createElement(tagName, options) {
  const el = document.createElement(tagName);
  if (typeof options.classList !== 'undefined') el.classList.add(...options.classList);
  if (typeof options.text !== 'undefined') el.textContent = options.text;
  if (typeof options.html !== 'undefined') el.innerHTML = options.html;
  if (typeof options.id !== 'undefined') el.id = options.id;
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
  const event = createElement('div', { id: eventData._id, classList: ['event'] });
  const number = createElement('h4', { text: index + '.' });
  const title = createElement('h4', { text: eventData.title });
  const btnContainerOne = createElement('div', { classList: ['btn-container'] });
  const btnContainerTwo = btnContainerOne.cloneNode();
  const editButton = createElement('button', { id: 'editEvent', html: '&plus;' });
  const removeButton = createElement('button', { id: 'removeButton', html: '&times;' });
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
