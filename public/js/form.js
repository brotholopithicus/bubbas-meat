function Form() {
  this.initialize = () => {
    this.submitButton = document.querySelector('button.submit');

    this.form = document.querySelector('form#contact');

    this.name = document.querySelector('input#name');
    this.company = document.querySelector('input#company');
    this.email = document.querySelector('input#email');
    this.message = document.querySelector('textarea#message');

    this.submitButton.addEventListener('click', this.submitForm);
  }
  this.submitForm = (e) => {
    e.preventDefault();
    const formData = {
      name: this.name.value,
      company: this.company.value,
      email: this.email.value,
      mesage: this.message.value
    }
    const options = {
      method: 'POST',
      headers: [{ name: 'Content-Type', value: 'application/json' }],
      data: JSON.stringify(formData)
    }

    requestify('/api', options).then(JSON.parse).then(res => {
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
}

const form = new Form();
form.initialize();

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
