function Carousel() {
  this.initialize = () => {
    this.currentIndex = 0;
    this.carousel = document.querySelector('.carousel');
    this.images = [];
    this.createDOM();
    this.images[this.currentIndex].style.display = 'block';
    [this.prev, this.next].forEach(control => control.addEventListener('click', this.handleControls));
    this.interval = setInterval(() => {
      this.nextCarouselImage();
    }, 1500);
  }
  this.createImageList = () => {
    let list = [];
    for (let i = 1; i < 7; i++) {
      list.push(`/imgs/image000${i}.jpeg`);
    }
    return list;
  }
  this.handleControls = (e) => {
    clearInterval(this.interval);
    this.nextCarouselImage();
  }
  this.nextCarouselImage = () => {
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
    let images = this.createImageList();
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
