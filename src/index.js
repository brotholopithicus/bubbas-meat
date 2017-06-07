import Siema from './slideify';

const slider = new Siema({
  selector: '.slider',
  duration: 200,
  easing: 'ease-out',
  perPage: 1,
  startIndex: 0,
  draggable: true,
  threshold: 20,
  loop: true,
  onInit: () => {},
  onChange: () => {},
});

slider.createButtons('transparent');
