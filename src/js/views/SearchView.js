import View from '../views/View.js';

class SearchView extends View {
  parent = document.querySelector('.search');
  searchField = this.parent.querySelector('.search__field');
  searchBtn = this.parent.querySelector('.search__btn');
  clear() {
    this.searchField.value = '';
  }
  addClickHandler(handler) {
    this.searchBtn.addEventListener('click', e => {
      e.preventDefault();
      handler();
    });
  }
  get searchWord() {
    const word = this.searchField.value;
    return word.trim();
  }
}
export default new SearchView();
