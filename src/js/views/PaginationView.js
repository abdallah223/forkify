import icons from 'url:../../img/icons.svg';
import View from './View.js';
class PaginationView extends View {
  parent = document.querySelector('.pagination');

  generateMarkup() {
    const { currentPage, pages } = this.data;

    if (currentPage === 1 && pages === 1) return ``;

    if (currentPage === 1 && pages > 1)
      return `
    <button data-page=${
      currentPage + 1
    } class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
              </button>`;

    if (pages > currentPage)
      return `<button data-page=${
        currentPage - 1
      } class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
        </button>
        <button data-page=${
          currentPage + 1
        } class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
        </svg>
        </button>`;

    if (currentPage === pages && pages > 1)
      return `<button data-page=${
        currentPage - 1
      } class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${currentPage - 1}</span>
  </button>
  `;
  }
  addClickHandler(handler) {
    this.parent.addEventListener('click', e => {
      const button = e.target.closest('.btn--inline');
      if (!button) return;
      handler(+button.dataset.page);
    });
  }
}

export default new PaginationView();
