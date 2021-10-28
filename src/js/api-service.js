export default class NewsApiService {
  constructor() {
      this.searchQuery = ''
      this.page =1
  }
  fetchArticles(searchQuery) {
      console.log(this);
      
    return fetch(
       ` https://pixabay.com/api/?image_type=photo&orientation=horizontal
         &q=${this.searchQuery}
         &page=${this.page}&per_page=12&key=24044020-c85f666b654f1044c9a0a20ae`
    )
      .then((respons) => respons.json())
      .then(({hits})=>{
          this.incrementPage()
          return  hits
      });
      
  }
    incrementPage(){
        this.page +=1;
    }
  resetPage(){
      this.page =1;
  }
  get query(){
      return this.searchQuery
  }
  set query(newQuery){
      this.searchQuery = newQuery
  }
}
