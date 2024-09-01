import View from './View.js';
import PreviewView from './previewView.js';

class BookmarkView extends View {
  parent = document.querySelector('.bookmarks .bookmarks__list');
  bookmarkButton = document.querySelector('.nav__btn--bookmarks');
  errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  generateMarkup() {
    return this.data.map(recipe => PreviewView.render(recipe, false)).join();
  }
  clear() {
    this.parent.innerHTML = '';
  }
  addRenderHandler(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarkView();
