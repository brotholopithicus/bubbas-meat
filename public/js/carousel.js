Siema.prototype.addArrows = function() {
  // make buttons & append them inside Siema's container
  this.prevArrow = document.createElement('button');
  this.nextArrow = document.createElement('button');
  this.prevArrow.textContent = '←';
  this.nextArrow.textContent = '→';
  this.selector.appendChild(this.prevArrow)
  this.selector.appendChild(this.nextArrow)

  // event handlers on buttons
  this.prevArrow.addEventListener('click', () => this.prev());
  this.nextArrow.addEventListener('click', () => this.next());
}

const slider = new Siema({
  selector: '.slider',
  duration: 200,
  easing: 'ease-out',
  perPage: 1,
  startIndex: 0,
  draggable: true,
  loop: true,
});

slider.addArrows();
