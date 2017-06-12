const images = document.querySelectorAll('.images img');
images.forEach(image => image.addEventListener('click', onImageClick));

function onImageClick(e) {
  let currentImage = createFullScreenImage.call(this);
}

function createFullScreenImage(e) {
  const containerContainer = document.querySelector('.container');
  const container = document.createElement('div');
  const closeButton = document.createElement('span');
  closeButton.classList.add('nav-toggle', 'open');
  closeButton.addEventListener('click', onCloseClick.bind(containerContainer));
  const closeIcon = document.createElement('span');
  closeIcon.classList.add('nav-icon');
  closeButton.appendChild(closeIcon);

  function onCloseClick(e) {
    this.removeChild(container);
  }

  const buttonStyles = {
    'z-index': '100',
    'position': 'fixed'
  }
  for (let style in buttonStyles) {
    closeButton.style[style] = buttonStyles[style];
  }
  container.appendChild(closeButton);

  const containerStyles = {
    'position': 'absolute',
    'top': '0',
    'left': '0',
    'right': '0',
    'bottom': '0',
    'overflow-y': 'auto',
    'background-color': 'rgba(0, 0, 0, 0.5)'
  }
  
  const image = this.cloneNode();
  const index = Array.prototype.indexOf.call(this.parentNode.children, this);

  image.src = `/imgs/image${index + 4}.jpeg`;
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
  for (let style in containerStyles) {
    container.style[style] = containerStyles[style];
  }
  for (let style in imageStyles) {
    image.style[style] = imageStyles[style];
  }
  container.appendChild(image);
  containerContainer.appendChild(container);
  return container;
}
