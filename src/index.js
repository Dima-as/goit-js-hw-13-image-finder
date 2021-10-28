import cardsTpl from "./tpl/cards-tpl";
import NewsApiService from "./js/api-service";
import './css/styles.css'
import LoadMoreBtn from './js/lord-more-btn'
import Notiflix from 'notiflix';
const refs = {
  searchForm: document.querySelector("#search-form"),
  listGallery: document.querySelector(".js-articles-container"),
};
const { searchForm, listGallery, btnLoadMore } = refs;

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const newsApiService = new NewsApiService();

searchForm.addEventListener("submit", onSearch);
loadMoreBtn.refs.button.addEventListener('click',  fetchHits);

function onSearch(e) {
  e.preventDefault();
  newsApiService.query = e.currentTarget.elements.query.value;
  if(newsApiService.query.trim() === ''){
    return alert('Введите данные для поиска!!!');
      
  }
  loadMoreBtn.show();
  newsApiService.resetPage();
  clearHitsContainer();
  fetchHits()
}

function fetchHits(){
  loadMoreBtn.disable();
 
  return newsApiService.fetchArticles().then(hits=>{
    appendHitsMarkup(hits)
    loadMoreBtn.enable();
    onLoadMore() 

  });
    
}

function onLoadMore() {
   listGallery.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function appendHitsMarkup(hits){
    listGallery.insertAdjacentHTML('beforeend',cardsTpl(hits));
 
}
function clearHitsContainer(){
    listGallery.innerHTML = '';
}
