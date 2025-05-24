export default class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    this._container = document.querySelector(this._containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(element, isInitial = false) {
    if (isInitial) {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}
