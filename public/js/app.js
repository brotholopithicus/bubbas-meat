const nav = document.querySelector('.nav-overlay');
const navToggle = document.querySelector('.nav-toggle');
const navIcon = document.querySelector('.nav-icon');

nav.style.height = '0%';

navToggle.addEventListener('click', (e) => {
  if (nav.style.height === '0%') {
    nav.style.height = '100%';
    navToggle.classList.add('open');
  } else {
    nav.style.height = '0%';
    navToggle.classList.remove('open');
  }
});
