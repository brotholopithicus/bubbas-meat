import './style.css';
import cat from '../../assets/imgs/optimized/haley_approves200x252.jpeg';
import swansonQuote from './swansonquote';

const reviews = document.querySelectorAll('.review');
const API_KEY = 'MTk4NjIw';
const url = `https://thecatapi.com/api/images/get?api_key=${API_KEY}&format=src&size=small&type=gif`;
reviews.forEach(review => {
  fetch(url).then(res => res.blob()).then(data => {
    const imgContainer = review.querySelector('.image');
    imgContainer.style.backgroundImage = `url(${URL.createObjectURL(data)})`;
    imgContainer.style.backgroundSize = `100% 100%`;
    imgContainer.style.backgroundPosition = `center center`;
  })
});
