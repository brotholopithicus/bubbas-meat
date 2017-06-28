import './style.css';
import images from './images';
import Slideify from './slideify';

const imageContainer = document.querySelector('.slider');

function createImageElement(src) {
  const img = document.createElement('img');
  img.src = src;
  imageContainer.appendChild(img);
}

images.forEach(image => createImageElement(image));

const slider = new Slideify({
  selector: imageContainer,
  duration: 200,
  easing: 'ease-out',
  perPage: 1,
  startIndex: 0,
  draggable: true,
  threshold: 20,
  interval: true,
  buttonStyle: 'transparent',
  loop: true,
  onInit: () => {},
  onChange: () => {},
});
