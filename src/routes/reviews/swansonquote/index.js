import './style.css';
import quotes from './quotes';
import images from './images';
import quoteContainerTemplate from './templates/swansonquote.pug';

function QuoteGenerator(selector) {
  this.selector = selector;
  this.intervalDuration = 8000;
  this.images = images;
  this.imageIndex = 0;
  this.quotes = quotes;
  this.quoteIndex = Math.floor(Math.random() * this.quotes.length);

  // render element template
  this.renderElementTemplate = () => {
    const quoteContainerHtml = quoteContainerTemplate();
    this.selector.innerHTML = quoteContainerHtml;
  }

  this.loadSelectors = () => {
    this.componentContainer = document.querySelector('.quote-container');
    this.quoteImage = document.querySelector('.quote-image');
    this.quoteText = document.querySelector('.quote-text');
  }

  this.loadImageEffects = () => {
    [this.quoteImage, this.quoteText].forEach(element => {
      element.classList.add('fadeInOut');
      element.style.animationDuration = `${this.intervalDuration}ms`;
    });
  }

  // create image element and bind to componenet
  this.createImage = (src) => {
    this.imageElement = document.createElement('img');
    this.imageElement.src = src;
    this.quoteImage.appendChild(this.imageElement);
  }

  // modify componenet text
  this.displayQuote = (q) => {
    if (typeof q === 'undefined') {
      q = this.quotes[this.quoteIndex];
    }
    this.quoteText.textContent = q;
  }

  // update quote index and display
  this.updateQuote = () => {
    this.quoteIndex++;
    if (this.quoteIndex >= this.quotes.length) {
      this.quoteIndex = 0;
    }
    this.displayQuote(this.quotes[this.quoteIndex]);
  }

  // modify componenet image source
  this.displayImage = (src) => {
    this.imageElement.src = src;
  }

  // update image index and display
  this.updateImage = () => {
    this.imageIndex++;
    if (this.imageIndex >= this.images.length) {
      this.imageIndex = 0;
    }
    this.displayImage(this.images[this.imageIndex]);
  }

  // initialize componenet elements and interval
  this.initialize = () => {
    this.renderElementTemplate()
    this.loadSelectors();
    this.loadImageEffects();
    this.createImage(this.images[this.imageIndex]);
    this.displayQuote();
    this.interval = setInterval(() => {
      if (this.quoteIndex % 3 === 0) {
        this.componentContainer.classList.toggle('reversed');
      }
      this.updateQuote();
      this.updateImage();
    }, this.intervalDuration);
  }
}

const quoteContainerParentElement = document.querySelector('.footer-container');

const quoteGen = new QuoteGenerator(quoteContainerParentElement);
quoteGen.initialize();

const reviewsContainer = document.querySelector('.reviews');

window.addEventListener('resize', windowResizeHandler);

function windowResizeHandler() {
  reviewsContainer.style.paddingBottom = `${quoteContainerParentElement.clientHeight}px`;
}

windowResizeHandler();
