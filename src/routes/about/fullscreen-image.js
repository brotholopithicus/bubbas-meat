import { images } from './images';

export default function FullScreenImage(image) {
  this.container = document.createElement('div');
  this.buttonConfig = function() {
    this.closeButton = document.createElement('span');
    this.closeButton.classList.add('nav-toggle', 'open');

    this.closeIcon = document.createElement('span');
    this.closeIcon.classList.add('nav-icon');

    this.closeButton.addEventListener('click', () => document.body.removeChild(this.container));
    this.closeButton.appendChild(this.closeIcon);

    const buttonStyles = {
      'z-index': '100',
      'position': 'fixed',
      'right': '1rem',
      'top': '0.5rem'
    }
    for (let style in buttonStyles) {
      this.closeButton.style[style] = buttonStyles[style];
    }
    this.container.appendChild(this.closeButton);
  }
  this.imageConfig = function() {
    const imageStyles = {
      'position': 'absolute',
      'top': '0',
      'left': '0',
      'right': '0',
      'margin': '0 auto',
      'width': '100%',
      'height': 'auto',
      'z-index': '99'
    }
    this.image = image.cloneNode();
    this.image.src = images[Array.prototype.indexOf.call(image.parentNode.children, image)];

    for (let style in imageStyles) {
      this.image.style[style] = imageStyles[style];
    }

    this.container.appendChild(this.image);
  }
  this.containerConfig = function() {
    const containerStyles = {
      'position': 'absolute',
      'top': '0',
      'left': '0',
      'right': '0',
      'bottom': '0',
      'overflow-y': 'auto',
      'background-color': 'rgba(0, 0, 0, 0.5)'
    }
    for (let style in containerStyles) {
      this.container.style[style] = containerStyles[style];
    }
    document.body.appendChild(this.container);
  }
  this.initialize = function() {
    this.buttonConfig();
    this.imageConfig();
    this.containerConfig();
  }
}
