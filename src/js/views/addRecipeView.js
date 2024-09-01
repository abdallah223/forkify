import View from './View.js';

class AddRecipeView extends View {
  parent = document.querySelector('.upload');
  closeBtn = document.querySelector('.btn--close-modal');
  overlay = document.querySelector('.overlay');
  recipeWindow = document.querySelector('.add-recipe-window');
  addRecipeBtn = document.querySelector('.nav__btn--add-recipe');
  message = 'The recipe is uploaded successfuly';
  constructor() {
    super();
    this.addHandlerHideWindow();
    this.addHandlerShowWindow();
  }
  toggleWindow() {
    this.recipeWindow.classList.toggle('hidden');
    this.overlay.classList.toggle('hidden');
  }
  addHandlerShowWindow() {
    this.addRecipeBtn.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHandlerHideWindow() {
    this.closeBtn.addEventListener('click', this.toggleWindow.bind(this));
    this.overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addSubmitHandler(handler) {
    this.parent.addEventListener('submit', function (e) {
      e.preventDefault();
      const recipe = Object.fromEntries([...new FormData(this)]);
      handler(recipe);
    });
  }
}

export default new AddRecipeView();
