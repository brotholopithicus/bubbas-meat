function Form() {
  this.initialize = () => {
    this.submitButton = document.querySelector('button.submit');

    this.form = document.querySelector('form#contact');
    this.name = document.querySelector('input#name');
    this.company = document.querySelector('input#company');
    this.email = document.querySelector('input#email');
    this.messageInput = document.querySelector('textarea#message');

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
    if (this.form.querySelectorAll('.success').length === 4) {
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
      case 'name':
        if (value.split(' ').length > 1) valid = true;
        break;
      case 'company':
        valid = true;
        break;
      case 'email':
        const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (regex.test(value)) valid = true;
        break;
      case 'message':
        if (value.length) valid = true;
        break;
      default:
        console.log('default!');
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
    formData.name = this.name.value;
    formData.company = this.company.value;
    formData.email = this.email.value;
    formData.message = this.messageInput.value;
    console.log(formData);
    const options = {
      method: 'POST',
      headers: [{ name: 'Content-Type', value: 'application/json' }],
      data: JSON.stringify(formData)
    }

    this.requestify('/api/email', options).then(JSON.parse).then(res => {
      if (res.message === 'SUCCESS') {
        this.displayResultMessage('&#10003;', 'rgb(90, 191, 13)');
        setTimeout(() => {
          window.location.href = '/';
        }, 800);
      } else {
        this.displayResultMessage('&times;', 'rgb(245, 73, 73)');
        setTimeout(() => {
          window.location.href = '/contact';
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
