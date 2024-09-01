import View from './View.js';
import PreviewView from './previewView.js';

class ResultsView extends View {
  parent = document.querySelector('.search-results ul');
  errorMessage = 'No recipes found for your query. Please try again!';

  generateMarkup() {
    return this.data.map(recipe => PreviewView.render(recipe, false)).join();
  }
  clear() {
    this.parent.innerHTML = '';
  }
}
export default new ResultsView();
