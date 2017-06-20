const quoteContainer = document.querySelector('p#quote span');

async function displayQuote() {
  const quote = await getQuote();
  quoteContainer.innerHTML = `${quote.quote}`;
}

function getQuote() {
  return new Promise((resolve, reject) => {
    fetch('/api/reviews/quote')
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
}

window.onload = () => {
  displayQuote();
  let interval = setInterval(() => {
    displayQuote();
  }, 4000);
}
