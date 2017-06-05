function Form() {
  this.initialize = () => {
    this.submitButton = document.querySelector('button.submit');

    this.form = document.querySelector('form#contact');
    this.name = document.querySelector('input#name');
    this.company = document.querySelector('input#company');
    this.email = document.querySelector('input#email');
    this.message = document.querySelector('textarea#message');

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
    this.formSubmitted = true;
    const formData = {
      name: this.name.value,
      company: this.company.value,
      email: this.email.value,
      message: this.message.value
    }
    const options = {
      method: 'POST',
      headers: [{ name: 'Content-Type', value: 'application/json' }],
      data: JSON.stringify(formData)
    }

    this.requestify('/api', options).then(JSON.parse).then(res => {
      if (res.message === 'SUCCESS') {
        this.displayResultMessage('&#10003;', 'rgb(90, 191, 13)');
      } else {
        this.displayResultMessage('&times;', 'rgb(245, 73, 73)');
      }
      setTimeout(() => {
        window.location.href = '/';
      }, 1000)
    });

  }
  this.displayResultMessage = (symbol, color) => {
    const success = document.createElement('span');
    success.style.position = 'absolute';
    success.style.height = '100%';
    success.style.width = '100%';
    success.style.top = '0';
    success.style.left = '0';
    success.style.display = 'flex';
    success.style.flexDirection = 'column';
    success.style.justifyContent = 'center';
    success.style.alignItems = 'center';
    success.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    const check = document.createElement('span');
    check.innerHTML = symbol;
    check.style.color = color;
    check.style.fontSize = '25vh';
    check.style.textShadow = '0px 0px 15px rgba(89, 89, 89, 1)';
    success.appendChild(check);
    document.body.appendChild(success);
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
