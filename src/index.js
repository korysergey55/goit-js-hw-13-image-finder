// import './sass/main.scss';
import { fetchData } from './js/api';
import cart_galary from './tpl/cart_galary.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const formRef = document.querySelector('.search-form');
const inputRef = document.querySelector('.intup');
const galleryRef = document.querySelector('.gallery');
const btnLoadMoreRef = document.querySelector('.load-more');

formRef.addEventListener('submit', sentForm);
btnLoadMoreRef.addEventListener('click', loadMore);
galleryRef.addEventListener('click', biggestFoto);

let searchWord = '';
let page = 1;

function sentForm(event) {
  event.preventDefault();
  galleryRef.innerHTML = '';
  page = 1;
  searchWord = inputRef.value;
  if (searchWord === '') return;

  getImages(false);
}

function loadMore(event) {
  page += 1;
  getImages(true);
}

function getImages(shouldScroll) {
  fetchData(searchWord, page).then(data => {
    const carts = cart_galary(data.hits);
    const hitsLength = data.hits.length;
    if (hitsLength === 0) {
      alert('Enter correct name of search!!!');
    }
    galleryRef.insertAdjacentHTML('beforeend', carts);
    btnLoadMoreRef.classList.add('is-open');
    if (hitsLength < 12) {
      btnLoadMoreRef.classList.remove('is-open');
    }
    if (shouldScroll) {
      scroll();
    }
  });
}

function scroll() {
  window.scrollTo({
    top: document.documentElement.offsetHeight,
    behavior: 'smooth',
  });
}

function biggestFoto(event) {
  if (event.target.tagName !== 'IMG') return;

  const largeImageURL = event.target.dataset.bigImage;
  const instance = basicLightbox.create(`
    <img src="${largeImageURL}" width="800" height="600">
`);
  instance.show();
}
