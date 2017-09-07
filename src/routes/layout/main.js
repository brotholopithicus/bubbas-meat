function App() {
  if (window.location.pathname !== '/') {
    this.nav = document.querySelector('.nav-overlay');
    this.navToggle = document.querySelector('.nav-toggle');
    this.navIcon = document.querySelector('.nav-icon');
    this.nav.style.height = '0%';

    this.toggleNavPageVisibility = () => {
      if (this.nav.style.height === '0%') {
        this.nav.style.height = '100%';
        this.navToggle.classList.add('open');
        this.locker = this.lockScroll();
      } else {
        this.locker.stop();
        this.nav.style.height = '0%';
        this.navToggle.classList.remove('open');
      }
    }
    this.navToggle.addEventListener('click', this.toggleNavPageVisibility);
  }
  this.lockScroll = () => {
    const lockX = window.scrollX;
    const lockY = window.scrollY;

    function lockIt() {
      window.scrollTo(lockX, lockY);
    }

    window.addEventListener('scroll', lockIt);

    return {
      stop() {
        window.removeEventListener('scroll', lockIt);
      }
    }
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
