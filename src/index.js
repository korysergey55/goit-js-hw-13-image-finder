import './sass/main.scss';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { fetchData } from './js/api';
import cart_galary from './tpl/cart_galary.hbs';

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

  getPrintImages(false);
}

function loadMore(event) {
  page += 1;
  getPrintImages(true);
}

function getPrintImages(shouldScroll) {
  fetchData(searchWord, page).then(data => {
    const carts = cart_galary(data.hits);
    const hitsLength = data.hits.length;

    galleryRef.insertAdjacentHTML('beforeend', carts);
    btnLoadMoreRef.classList.add('is-open');
    formRef.reset();

    if (hitsLength < 1) {
      btnLoadMoreRef.classList.remove('is-open');
    }
    if (hitsLength === 0) {
      alert('Enter correct name of search please!');
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
