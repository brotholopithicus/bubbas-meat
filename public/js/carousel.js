Siema.prototype.addArrows = function() {
  this.prevArrow = document.createElement('span');
  this.nextArrow = document.createElement('span');
  this.prevArrow.innerHTML = `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="50%" height="50%" viewBox="0 0 1473 1559" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Generator: Sketch 42 (36781) - http://www.bohemiancoding.com/sketch -->
      <title>arrow-left</title>
      <desc>Created with Sketch.</desc>
      <defs></defs>
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="arrow-left" fill-rule="nonzero" fill="#FFFFFF">
              <g id="g3003" transform="translate(736.711864, 779.678000) scale(-1, 1) rotate(-180.000000) translate(-736.711864, -779.678000) translate(0.711864, 0.678000)">
                  <path d="M1472,843 L1472,715 C1472,679.666667 1461.16667,649.5 1439.5,624.5 C1417.83333,599.5 1389.66667,587 1355,587 L651,587 L944,293 C969.333333,269 982,239 982,203 C982,167 969.333333,137 944,113 L869,37 C844.333333,12.3333333 814.333333,-2.27373675e-13 779,-2.27373675e-13 C744.333333,-2.27373675e-13 714,12.3333333 688,37 L37,689 C12.3333333,713.666667 -2.27373675e-13,743.666667 -2.27373675e-13,779 C-2.27373675e-13,813.666667 12.3333333,844 37,870 L688,1520 C713.333333,1545.33333 743.666667,1558 779,1558 C813.666667,1558 843.666667,1545.33333 869,1520 L944,1446 C969.333333,1420.66667 982,1390.33333 982,1355 C982,1319.66667 969.333333,1289.33333 944,1264 L651,971 L1355,971 C1389.66667,971 1417.83333,958.5 1439.5,933.5 C1461.16667,908.5 1472,878.333333 1472,843 Z" id="path3005"></path>
              </g>
          </g>
      </g>
  </svg>`;
  this.nextArrow.innerHTML = `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="50%" height="50%" viewBox="0 0 1473 1559" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Generator: Sketch 42 (36781) - http://www.bohemiancoding.com/sketch -->
      <title>arrow-right</title>
      <desc>Created with Sketch.</desc>
      <defs></defs>
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="arrow-right" fill-rule="nonzero" fill="#FFFFFF">
              <g id="g3015" transform="translate(736.271190, 779.050800) scale(-1, 1) rotate(-180.000000) translate(-736.271190, -779.050800) translate(0.271190, 0.050800)">
                  <path d="M1472,779 C1472,743 1459.66667,712.666667 1435,688 L784,37 C758,12.3333333 727.666667,0 693,0 C659,0 629,12.3333333 603,37 L528,112 C502.666667,137.333333 490,167.666667 490,203 C490,238.333333 502.666667,268.666667 528,294 L821,587 L117,587 C82.3333333,587 54.1666667,599.5 32.5,624.5 C10.8333333,649.5 0,679.666667 0,715 L0,843 C0,878.333333 10.8333333,908.5 32.5,933.5 C54.1666667,958.5 82.3333333,971 117,971 L821,971 L528,1265 C502.666667,1289 490,1319 490,1355 C490,1391 502.666667,1421 528,1445 L603,1520 C628.333333,1545.33333 658.333333,1558 693,1558 C728.333333,1558 758.666667,1545.33333 784,1520 L1435,869 C1459.66667,845.666667 1472,815.666667 1472,779 Z" id="path3017"></path>
              </g>
          </g>
      </g>
  </svg>`;
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
