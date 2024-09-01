import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PreviewView extends View {
  parent = document.querySelector('*');

  generateMarkup() {
    const id = window.location.hash.slice(1);

    return `<li class="preview">
              <a class="preview__link ${
                id === this.data.id ? 'preview__link--active' : ''
              }" href="#${this.data.id}">
                <figure class="preview__fig">
                  <img src="${this.data.imageUrl}" alt="${this.data.title}" />
                </figure>
                <div class="preview__data">
                  <h4 class="preview__title">${this.data.title}</h4>
                  <p class="preview__publisher">${this.data.publisher}</p>
                     <!-- <div class="preview__user-generated">
                    <svg>
                      <use href="${icons}#icon-user"></use>
                    </svg>
                  </div>-->
                </div>
              </a>
            </li>`;
  }
}
export default new PreviewView();
