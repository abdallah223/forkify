import icons from 'url:../../img/icons.svg';
import View from '../views/View.js';
class RecipeView extends View {
  parent = document.querySelector('.recipe');
  errorMessage = 'Start by searching for a recipe or an ingredient. Have fun!';

  generateMarkup() {
    return `<figure class="recipe__fig">
          <img src="${this.data.imageUrl}" alt="${
      this.data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this.data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this.data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button data-servings="${
                this.data.servings - 1
              }" class="btn--tiny btn--update-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button data-servings="${
                this.data.servings + 1
              }" class="btn--tiny btn--update-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round bookmark-btn">
            <svg class="">
              <use href="${icons}${
      this.data.bookmarked ? '#icon-bookmark-fill' : '#icon-bookmark'
    }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this.data.ingredients.reduce((acc, ing) => {
            return (
              acc +
              `<li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="src/img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ing.quantity ?? ''}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ing.unit ?? ''}</span>
              ${ing.description}
            </div>
          </li>`
            );
          }, '')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this.data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
      `;
  }
  addRenderHandler(handler) {
    ['load', 'hashchange'].forEach(e => {
      window.addEventListener(e, handler);
    });
  }
  addServantsHandler(handler) {
    this.parent.addEventListener('click', e => {
      const button = e.target.closest('.btn--update-servings');
      if (!button) return;
      const { servings } = button.dataset;
      if (+servings > 0) handler(+servings);
    });
  }
  addBookmarkHandler(handler) {
    this.parent.addEventListener('click', e => {
      const bookmarkBtn = e.target.closest('.bookmark-btn');
      if (!bookmarkBtn) return;

      handler();
    });
  }
}

export default new RecipeView();
