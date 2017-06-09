flatpickr('.flatpickr', { enableTime: true, minDate: Date.now() });

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
    this.link = document.querySelector('input#link');

    this.formInputs = this.form.querySelectorAll('.form-input');
    this.formInputs.forEach(input => input.addEventListener('change', this.formInputHandler));
    this.formInputs.forEach(input => input.addEventListener('keyup', this.formInputHandler));

    this.submitButton.addEventListener('click', this.submitForm);

    this.formReady = false;
    this.formSubmitted = false;
  }
  this.formInputHandler = (e) => {
    this.formSwitch(e.target);
    this.checkFormSubmitReady();
    if (this.formReady) {
      this.submitButton.disabled = false;
    }
  }
  this.checkFormSubmitReady = () => {
    if (this.form.querySelectorAll('.success').length === this.formInputs.length) {
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
      case 'link':
        if (value.length) {
          try {
            const url = new URL(value);
            valid = true;
          } catch (e) {
            valid = false;
          }
        }
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
      target.removeAttribute('required');
    } else {
      target.classList.add('error');
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

    this.requestify('/api/event', options).then(JSON.parse).then(res => {
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

function deleteClickHandler(e) {
  console.log('deleting....');
  const eventId = JSON.parse(e.target.parentNode.dataset.event)._id;
  const url = `/api/event/${eventId}`;
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
