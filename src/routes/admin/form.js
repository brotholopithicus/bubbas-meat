import flatpickr from './flatpickr';
import requestify from './requestify';

import template from './templates/events.pug';

function Form() {
  this.initialize = () => {
    this.submitButton = document.querySelector('button.submit');
    this.date = {
      startDate: flatpickr('#startDate', { enableTime: true, minDate: 'today' }),
      endDate: flatpickr('#endDate', { enableTime: true, minDate: 'today' })
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
    requestify(`/api/events`, options).then(() => {
      fetchEvents();
      this.formSubmitted = false;
    });
  }
}

const form = new Form();
form.initialize();

function editClickHandler() {
  requestify(`/api/events/${this.dataset.id}`, { method: 'GET' })
    .then(res => JSON.parse(res).event)
    .then(event => {
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

function removeClickHandler() {
  const confirmRemove = confirm(`Are you sure you want to remove ${this.dataset.id}?`);
  if (confirmRemove) {
    requestify(`/api/events/${this.dataset.id}`, { method: 'DELETE' }).then(() => {
      fetchEvents();
      form.formInputs.forEach(input => input.value = '');
    });
  }
}

const eventsContainer = document.querySelector('.event-list');

function bindEventListeners(selector, listener, handler) {
  document.querySelectorAll(selector).forEach(el => el.addEventListener(listener, () => handler.call(el.parentNode.parentNode)));
}

async function fetchEvents() {
  const events = await requestify('/api/events', { method: 'GET' }).then(JSON.parse);
  const eventListHtml = template({ events });
  eventsContainer.innerHTML = eventListHtml;
  bindEventListeners('#editEvent', 'click', editClickHandler);
  bindEventListeners('#removeEvent', 'click', removeClickHandler);
}

window.onload = () => fetchEvents();
