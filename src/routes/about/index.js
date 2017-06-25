import {thumbs} from './images';
import FullScreenImage from './fullscreen-image';

const imageContainer = document.querySelector('.images');

function createImageElement(src) {
  const img = document.createElement('img');
  img.src = src;
  img.addEventListener('click', onImageClick);
  imageContainer.appendChild(img);
}

function onImageClick(e) {
  let image = new FullScreenImage(this);
  image.initialize();
}

thumbs.forEach(thumb => createImageElement(thumb));
