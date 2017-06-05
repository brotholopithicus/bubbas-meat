function App() {
  this.initialize = () => {
    this.nav = document.querySelector('.nav-overlay');
    this.navToggle = document.querySelector('.nav-toggle');
    this.navIcon = document.querySelector('.nav-icon');
    this.nav.style.height = '0%';
    this.navToggle.addEventListener('click', this.toggleNavPageVisibility);
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
}

const app = new App();
app.initialize();
