const flatpickr_input = flatpickr('.flatpickr', { enableTime: true, minDate: Date.now() });

function Form() {
  this.initialize = () => {
    this.submitButton = document.querySelector('button.submit');

    this.form = document.querySelector('form');
    this.title = document.querySelector('input#title');
    this.description = document.querySelector('input#description');
    this.date = document.querySelector('input#date');
    this.address = document.querySelector('input#address');
    this.city = document.querySelector('input#city');
    this.state = document.querySelector('input#state');
    this.zip = document.querySelector('input#zip');

    this.formControlLink = document.querySelector('.form-control-link');

    this.linkToggle = this.formControlLink.querySelector('#link-toggle');
    this.linkToggle.addEventListener('click', this.addLink);

    this.link = document.querySelector('input#url');
    this.linkText = document.querySelector('input#text');

    this.linkInputs = document.querySelector('.link-inputs');
    this.linkInputs.style.display = 'none';

    this.numLinks = 0;

    this.formInputs = this.form.querySelectorAll('.form-input');
    this.formInputs.forEach(input => input.addEventListener('change', this.formInputHandler));
    this.formInputs.forEach(input => input.addEventListener('keyup', this.formInputHandler));

    this.submitButton.addEventListener('click', this.submitForm);

    this.modifier = 2;

    this.formReady = false;
    this.formSubmitted = false;
  }
  this.addLink = (e) => {
    this.modifier = 0;
    this.linkInputs.style.display = 'block';
    this.formControlLink.style.display = 'none';
  }
  this.hideLink = () => {
    this.modifier = 2;
    this.linkInputs.style.display = 'none';
    this.formControlLink.style.display = 'flex';
  }
  this.formInputHandler = (e) => {
    this.formSwitch(e.target);
    this.checkFormSubmitReady();
    if (this.formReady) {
      this.submitButton.disabled = false;
    }
  }
  this.checkFormSubmitReady = () => {
    console.log(this.formInputs.length - this.modifier);
    console.log(this.form.querySelectorAll('.success').length);
    if (this.form.querySelectorAll('.success').length === this.formInputs.length - this.modifier) {
      this.submitButton.disabled = false;
    } else {
      this.submitButton.disabled = true;
    }
  }
  this.formSwitch = (target) => {
    let id = target.id;
    let value = target.value;
    let valid = false;
    switch (id) {
      case 'title':
        if (value.length) valid = true;
        break;
      case 'description':
        if (value.length) valid = true;
        break;
      case 'date':
        if (value.length) valid = true;
        break;
      case 'address':
        if (value.length) valid = true;
        break;
      case 'city':
        if (value.length) valid = true;
        break;
      case 'state':
        if (value.length) valid = true;
        break;
      case 'zip':
        if (value.length) valid = true;
        break;
      case 'url':
        if (value.length) {
          try {
            const url = new URL(value);
            valid = true;
          } catch (e) {
            valid = false;
          }
        }
        break;
      case 'text':
        if (value.length) valid = true;
        break;
      default:
        console.log('default!');
        valid = true;
        break;
    }
    return this.modifyElementStatus(target, valid);
  }
  this.modifyElementStatus = (target, valid) => {
    if (valid) {
      target.classList.remove('error');
      target.classList.add('success');
      target.required = false;
    } else {
      target.classList.add('error');
      target.classList.remove('success');
      target.required = true;
    }
    return valid;
  }
  this.submitForm = (e) => {
    e.preventDefault();
    if (this.formSubmitted) return;
    this.createMessageSpan();
    this.formSubmitted = true;
    let formData = {};
    this.formInputs.forEach(input => {
      formData[input.id] = input.value
    });

    const options = {
      method: 'POST',
      headers: [{ name: 'Content-Type', value: 'application/json' }],
      data: JSON.stringify(formData)
    }

    this.requestify('/api/events/new', options).then(JSON.parse).then(res => {
      if (res.message === 'SUCCESS') {
        this.displayResultMessage('&#10003;', 'rgb(90, 191, 13)');
        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        this.displayResultMessage('&times;', 'rgb(245, 73, 73)');
        setTimeout(() => {
          this.formSubmitted = false;
          document.body.removeChild(this.message);
        }, 800);
      }
    });

  }
  this.createMessageSpan = () => {
    this.message = document.createElement('span');
    this.message.classList.add('message');
    document.body.appendChild(this.message);

    this.messageSymbol = document.createElement('span');
    this.messageSymbol.classList.add('loader');
    this.message.appendChild(this.messageSymbol);
  }
  this.displayResultMessage = (symbol, color) => {
    this.messageSymbol.classList.remove('loader');
    this.messageSymbol.classList.add('message-symbol');
    this.messageSymbol.innerHTML = symbol;
    this.messageSymbol.style.color = color;
    this.messageSymbol.classList.add('message-symbol');
  }

  this.requestify = (url, options) => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open(options.method, url);
      if (typeof options.headers !== 'undefined') options.headers.forEach(header => req.setRequestHeader(header.name, header.value));
      req.onload = () => {
        if (req.status >= 200 && req.status < 300) {
          resolve(req.response);
        } else {
          reject(Error(req.statusText));
        }
      }
      req.onerror = () => reject({ status: req.status, statusText: req.statusText });
      req.send(options.data);
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

function requestify(url, options) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open(options.method, url);
    if (typeof options.headers !== 'undefined') options.headers.forEach(header => req.setRequestHeader(header.name, header.value));
    req.onload = () => {
      if (req.status >= 200 && req.status < 300) {
        resolve(req.response);
      } else {
        reject(Error(req.statusText));
      }
    }
    req.onerror = () => reject({ status: req.status, statusText: req.statusText });
    req.send(options.data);
  });
}
