'use strict'

export class Section {
  constructor({
    renderer
  }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(card) {
    this._container.append(card);
  }

  prependItem(card) {
    this._container.prepend(card);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems(cards) {
    this.clear();
    cards.forEach(item => {
      this._renderer(item);
    });
  }
}
