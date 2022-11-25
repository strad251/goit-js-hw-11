import Notiflix from 'notiflix';
import { getMarkupElements } from './js/markup';
import { simpleLightBox } from './js/lightbox';
import PixabayApi from './js/pixabay-api';

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');


const pixabayApi = new PixabayApi();


async function fetchRequest(event) {
  event.preventDefault();
  pixabayApi.page = 1;
  try {
    pixabayApi.searchQuery = event.target.elements.searchQuery.value
      .trim()
      .toLowerCase();
    galleryEl.innerHTML = '';
    const { data } = await pixabayApi.fetchPhoto();
    if (!data.totalHits) {
      Notiflix.Notify.failure('No result');
      return;
    }
    if (data.totalHits > pixabayApi.perPage) {
      loadMoreBtn.classList.remove('is-hidden');
    }
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`);
    renderMarkup(data.hits);

  } catch (error) {
    Notiflix.Notify.failure(error);
  }
}

formEl.addEventListener('submit', fetchRequest);

async function onLoadMoreBtn() {
  pixabayApi.page += 1;
  const { data } = await pixabayApi.fetchPhoto();
  if (data.hits.length < pixabayApi.perPage) {
     loadMoreBtn.classList.add('is-hidden');
     Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results.")
  }
  renderMarkup(data.hits);

}

loadMoreBtn.addEventListener('click', onLoadMoreBtn);


function renderMarkup(el) {
  const markup = el.map(item => getMarkupElements(item));
  galleryEl.insertAdjacentHTML('beforeend', markup.join(''));
  simpleLightBox.refresh();
}



