import icons from 'url:../../img/icons.svg';

export default class View {
  data;
  renderSpinner = function () {
    const spinner = `<div class="spinner">
      <svg>
      <use href="${icons}#icon-loader"></use>
      </svg>
      </div>`;
    this.parent.innerHTML = '';
    this.parent.insertAdjacentHTML('afterbegin', spinner);
  };

  clear() {
    this.parent.innerHTML = '';
  }
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this.data = data;
    const markup = this.generateMarkup();
    console.log(this.data);
    console.log(markup);
    if (!render) return markup;
    this.clear();
    this.parent.insertAdjacentHTML('beforeend', markup);
  }
  update(data) {
    this.data = data;
    const markup = this.generateMarkup();
    const newMarkup = document.createRange().createContextualFragment(markup);
    const newMarkupArray = Array.from(newMarkup.querySelectorAll('*'));
    const oldMarkupArray = Array.from(this.parent.querySelectorAll('*'));
    newMarkupArray.forEach((newNode, index) => {
      const oldNode = oldMarkupArray[index];
      if (
        !newNode.isEqualNode(oldNode) &&
        newNode.firstChild?.nodeValue.trim() !== ''
      ) {
        oldNode.textContent = newNode.textContent;
      }
      if (!newNode.isEqualNode(oldNode)) {
        Array.from(newNode.attributes).forEach(att =>
          oldNode.setAttribute(att.name, att.nodeValue)
        );
      }
    });
  }
  renderError(msg = this.errorMessage) {
    this.clear();
    const markup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${msg}</p>
          </div>`;
    this.parent.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(msg = this.message) {
    this.clear();
    const markup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${msg}</p>
          </div>`;
    this.parent.insertAdjacentHTML('afterbegin', markup);
  }
}
