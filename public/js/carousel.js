const url = `https://source.unsplash.com/random/800x600`;
const images = ['https://images.unsplash.com/photo-1486174070967-b0f1610f76de?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&h=300&fit=crop&s=0e927a1fdbf2e996360e803e06b4603a', 'https://images.unsplash.com/photo-1494118862175-3ecb4c309425?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&h=300&fit=crop&s=85dd98320ce3d73b6ed2da3e733be8ce', 'https://images.unsplash.com/photo-1440252775693-6545cfa377ec?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&h=300&fit=crop&s=67077625ef6dc266594b08bb357cdc53', 'https://images.unsplash.com/photo-1464548440467-d10d8aab562a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&h=300&fit=crop&s=e63028e786587c953e98887f1eea308c'];

function Carousel() {
  this.initialize = () => {
    console.log('i am carousel');
    this.currentIndex = 0;
    this.carousel = document.querySelector('.carousel');
    this.images = [];
    this.createDOM();
    this.images[this.currentIndex].style.display = 'block';
    [this.prev, this.next].forEach(control => control.addEventListener('click', this.handleControls));
  }
  this.handleControls = (e) => {
    this.images[this.currentIndex].style.display = 'none';
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.images[this.currentIndex].style.display = 'block';
    this.images[this.currentIndex].classList.add('fadeIn');
  }
  this.createDOM = () => {
    this.appendImages(this.carousel);

    this.prev = this.createElement('span', { classes: ['prev'], text: '<' });
    this.carousel.prepend(this.prev);

    this.next = this.createElement('span', { classes: ['next'], text: '>' });
    this.carousel.appendChild(this.next);
  }
  this.handleAnimationEnd = (e) => {
    if (e.animationName === 'fadeOut') {
      e.target.style.display = 'none';
    }
    e.target.classList.remove(e.animationName);
  }
  this.appendImages = (parent) => {
    for (let i = 0; i < images.length; i++) {
      let img = this.createElement('img', { src: images[i], id: i });
      img.addEventListener('animationend', this.handleAnimationEnd);
      this.images.push(img);
      img.style.display = 'none';
      parent.appendChild(img);
    }
  }
  this.createElement = (tag, options) => {
    const el = document.createElement(tag);
    if (typeof options.classes !== 'undefined') options.classes.forEach(className => el.classList.add(className));
    if (typeof options.text !== 'undefined') el.textContent = options.text;
    if (typeof options.src !== 'undefined') el.src = options.src;
    if (typeof options.id !== 'undefined') el.id = options.id;
    return el;
  }
}

let carousel = new Carousel();
carousel.initialize();

// function Carousel() {
//   this.initialize = () => {
//     this.carousel = document.querySelector('.carousel');
//     this.angle = 0;
//     this.controls = document.querySelectorAll('span.spin');
//     this.controls.forEach(control => control.addEventListener('click', this.handleSpin));
//   }
//   this.handleSpin = (e) => {
//     const direction = e.target.dataset.direction;
//     if (direction === 'left') {
//       this.angle += this.degrees;
//     } else {
//       this.angle -= this.degrees;;
//     }
//     this.spinner.style.transform = `rotateY(${this.angle}deg)`;
//   }
//   this.createDOM = () => {
//     this.spinner = this.createElement('div', { classes: ['spinner'] });
//     this.carousel.appendChild(this.spinner);
//     this.appendImages(this.spinner);
//   }
//   this.appendImages = (parent) => {
//     this.rotAngle = 0;
//     this.degrees = 360 / images.length;
//     for (let i = 0; i < images.length; i++) {
//       let img = this.createElement('img', { src: images[i], id: i });
//       img.style.transform = `rotateY(${this.rotAngle}deg)`;
//       this.rotAngle -= this.degrees;
//       if (this.rotAngle < -360) this.rotAngle = 0;
//       parent.appendChild(img);
//     }
//   }
//   this.createElement = (tag, options) => {
//     const el = document.createElement(tag);
//     if (typeof options.classes !== 'undefined') options.classes.forEach(className => el.classList.add(className));
//     if (typeof options.src !== 'undefined') el.src = options.src;
//     if (typeof options.id !== 'undefined') el.id = options.id;
//     return el;
//   }
// }
//
// let carousel = new Carousel();
// carousel.initialize();
