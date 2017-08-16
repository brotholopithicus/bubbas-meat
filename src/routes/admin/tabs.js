const tabs = document.querySelectorAll('.tabs li');
tabs.forEach(tab => tab.addEventListener('click', tabClickHandler));

const eventsContainer = document.querySelector('#events');
const reviewsContainer = document.querySelector('#reviews');

const tabContent = [eventsContainer, reviewsContainer];

function tabClickHandler(e) {
  e.preventDefault();
  tabs.forEach(tab => tab.classList.remove('is-active'));
  tabContent.forEach(item => item.classList.remove('active'));
  this.classList.add('is-active');
  const current = document.querySelector(`#${this.dataset.tab}`);
  current.classList.add('active');
}
