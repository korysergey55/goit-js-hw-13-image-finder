// import './sass/main.scss';
import { fetchData } from './js/api';
import cart_galary from './tpl/cart_galary.hbs';

const formRef = document.querySelector('.search-form');
const inputRef = document.querySelector('.intup');
const galleryRef = document.querySelector('.gallery');
const inputBtnRef = document.querySelector('.input-button');

formRef.addEventListener('submit', sentForm);

function sentForm(event) {
  event.preventDefault();
  const value = inputRef.value;
  if (value == '') return;

  fetchData(value).then(data => {
    console.log(data);
    const carts = cart_galary(data.hits);
    galleryRef.insertAdjacentHTML('beforeend', carts);
  });
}
