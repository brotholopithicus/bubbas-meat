function App() {
  this.currentPath = window.location.pathname;
  if (this.currentPath === '/') {
    this.socialMediaLinks = document.querySelector('.links');
    this.socialMediaLinks.style.display = 'none';
  } else {
    this.nav = document.querySelector('.nav-overlay');
    this.navToggle = document.querySelector('.nav-toggle');
    this.navIcon = document.querySelector('.nav-icon');
    this.nav.style.height = '0%';
    this.toggleNavPageVisibility = () => {
      if (this.nav.style.height === '0%') {
        this.nav.style.height = '100%';
        this.navToggle.classList.add('open');
      } else {
        this.nav.style.height = '0%';
        this.navToggle.classList.remove('open');
      }
    }
    this.navToggle.addEventListener('click', this.toggleNavPageVisibility);
  }
  this.resizeWindow = () => {
    window.innerWidth = window.outerWidth;
  }
  this.initialize = () => {
    window.addEventListener('resize', this.resizeWindow);
    this.resizeWindow();
  }
}

const app = new App();
app.initialize();
