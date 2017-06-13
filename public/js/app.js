const socialMediaLinks = document.querySelector('.links');
const path = window.location.pathname;

function App() {
  this.initialize = () => {
    this.nav = document.querySelector('.nav-overlay');
    this.navToggle = document.querySelector('.nav-toggle');
    this.navIcon = document.querySelector('.nav-icon');
    this.nav.style.height = '0%';
    this.navToggle.addEventListener('click', this.toggleNavPageVisibility);

    window.addEventListener('resize', this.resizeWindow);
    this.resizeWindow();
  }
  this.toggleNavPageVisibility = () => {
    if (this.nav.style.height === '0%') {
      this.nav.style.height = '100%';
      this.navToggle.classList.add('open');
    } else {
      this.nav.style.height = '0%';
      this.navToggle.classList.remove('open');
    }
  }
  this.resizeWindow = () => {
    window.innerWidth = window.outerWidth;
  }
}


// hide social media links on first page
if (path === '/') {
  socialMediaLinks.style.display = 'none';
} else {
  const app = new App();
  app.initialize();
}
