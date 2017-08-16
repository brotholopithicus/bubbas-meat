import flatpickr from './flatpickr';
import requestify from './requestify';

import eventTemplate from './templates/events/events.pug';
import reviewTemplate from './templates/reviews/reviews.pug';

function Form() {
  this.initialize = () => {
    // prevent form submission on enter key down
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
      }
    });

    this.submitButton = document.querySelector('button#submit');
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

    this.status = {
      isNew: true,
      id: null
    }
  }
  this.submitForm = (e) => {
    e.preventDefault();
    if (this.formSubmitted) return;
    this.formSubmitted = true;

    const formData = {};

    this.formInputs.forEach(input => {
      formData[input.id] = input.value
      input.value = '';
    });
    formData.repeat = [...document.querySelectorAll(`input[type='radio']`)].find(input => input.checked).value;

    const request = {
      options: {
        headers: [{ name: 'Content-Type', value: 'application/json' }],
        data: JSON.stringify(formData)
      }
    }

    if (this.status.isNew) {
      request.url = '/api/events';
      request.options.method = 'POST';
    } else {
      request.url = `/api/events/${this.status.id}`
      request.options.method = 'PUT'
    }

    requestify(request.url, request.options).then((res) => {
      console.log(res);
      this.resetForm();
      fetchEvents();
    });

  }
  this.resetForm = () => {
    this.formSubmitted = false;
    this.status.isNew = true;
    this.status.id = null;
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

      const repeatRadio = [...document.querySelectorAll(`input[type='radio']`)].find(radio => radio.value === event.date.repeat);
      repeatRadio.checked = true;

      form.status.isNew = false;
      form.status.id = event._id;

      if (form.state.querySelector(`[selected='true']`)) stateSelect.selected = false;

      form.state.querySelector(`[value='${event.location.address.state}']`).selected = true;
    })
}

function removeClickHandler() {
  const title = this.querySelector('.event-title').textContent;
  const confirmRemove = confirm(`Are you sure you want to remove "${title}"?`);
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
  const eventListHtml = eventTemplate({ events });
  eventsContainer.innerHTML = eventListHtml;
  bindEventListeners('#editEvent', 'click', editClickHandler);
  bindEventListeners('#removeEvent', 'click', removeClickHandler);
}

const reviewsContainer = document.querySelector('.review-list');

function toggleReviewShow() {
  console.log(this.dataset.id);
  requestify(`/api/reviews/${this.dataset.id}`, { method: 'PUT' });
}

async function fetchReviews() {
  const reviews = await requestify('/api/reviews', { method: 'GET' }).then(JSON.parse);
  const reviewListHtml = reviewTemplate({ reviews: reviews.reviews });
  reviewsContainer.innerHTML = reviewListHtml;
  bindEventListeners('.review-toggle', 'click', toggleReviewShow);
  bindEventListeners('#removeReview', 'click', removeReviewClickHandler);
}

function removeReviewClickHandler() {
  requestify(`/api/reviews/${this.dataset.id}`, { method: 'DELETE' }).then(() => fetchReviews());
}

function clearForm(e) {
  e.preventDefault();
  const clearForm = confirm('Do you really want to clear all inputs and reset form?');
  if (!clearForm) return;
  form.formInputs.forEach(input => input.value = '');
  form.status.isNew = true;
  form.status.id = null;
}

const clearButton = document.querySelector('button#clear');
clearButton.addEventListener('click', clearForm);

import newReviewTemplate from './templates/reviews/new_review.pug';

const newReviewContainer = document.querySelector('.new-review');

function renderNewReviewTemplate() {
  const newReviewHtml = newReviewTemplate();
  newReviewContainer.innerHTML = newReviewHtml;
  const submitReviewButton = document.querySelector('#submitReview');
  submitReviewButton.addEventListener('click', submitNewReviewForm);
  const clearNewReviewButton = document.querySelector('#clearReview');
  clearNewReviewButton.addEventListener('click', clearNewReviewForm);
}

let newReviewSubmitted = false;

function submitNewReviewForm(e) {
  e.preventDefault();
  if (newReviewSubmitted) return;

  newReviewSubmitted = true;
  const review = {};
  review.quote = document.querySelector('#quote').value;
  review.name = document.querySelector('#name').value;
  if (!review.quote.length || !review.name.length) return;

  const options = {
    method: 'POST',
    headers: [{
      name: 'Content-Type',
      value: 'application/json'
    }],
    data: JSON.stringify(review)
  }
  requestify(`/api/reviews`, options)
    .then(res => JSON.parse(res))
    .then(res => {
      if (res.message === 'SUCCESS') {
        clearNewReviewForm();
        fetchReviews();
      }
    }).catch(err => console.error(`Error: ${err.message}`));
}

function clearNewReviewForm(e) {
  e.preventDefault();
  const newReviewForm = document.querySelector('.new-review');
  newReviewForm.querySelectorAll('.form-input').forEach(input => input.value = '');
}

window.onload = () => {
  renderNewReviewTemplate();
  fetchEvents();
  fetchReviews();
}
