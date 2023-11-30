"use strict";

export class SevoContentFilter {
  constructor(inputContentList, config = {}) {
    this._inputStuffList = inputContentList;

    this.activeClass = config.activeClass || "active";
    this.all = config.all || "All";
    this.contentDataName = config.contentDataName || "category";
    this.onComplete = () => {};

    this._categories = [];
    this._buttonsContainer = null;
    this._buttons = null;

    this._extractCategories();
    this._createButtons();
  }

  get buttonsContainer() {
    return this._buttonsContainer;
  }

  get categories() {
    return this._categories;
  }

  _extractCategories() {
    const cat = new Set();
    this._inputStuffList.forEach((item) => {
      const categories = item.dataset[this.contentDataName].split(",");
      categories.forEach((category) => {
        cat.add(category);
      });
      this._categories = Array.from(cat);
      this._categories.unshift(this.all);
    });
  }

  _createButtons() {
    this._buttonsContainer = document.createElement("div");
    this._categories.forEach((item) => {
      const button = document.createElement("button");
      button.textContent = item;
      button.dataset.filter = item;
      this._buttonsContainer.appendChild(button);
    });
    return this._buttonsContainer;
  }

  run() {
    this._buttons = this._buttonsContainer.querySelectorAll(
      "button[data-filter]"
    );
    this._buttons.forEach((item) => {
      item.addEventListener("click", (evt) => {
        this.filter(evt.target);
      });
    });
    this.onComplete(this);
  }

  filter(target) {
    this._filterButtonClick(target);
    this._filterContent(target);
  }

  _filterButtonClick(target) {
    this._buttons.forEach((item) => {
      item.classList.remove(this.activeClass);
    });
    target.classList.add(this.activeClass);
  }

  _filterContent(target) {
    const filter = target.dataset.filter;
    this._inputStuffList.forEach((item) => {
      if (filter === this.all) {
        item.removeAttribute("hidden");
        return;
      }
      item.removeAttribute("hidden");
      if (!item.dataset.category.includes(filter)) {
        item.setAttribute("hidden", "");
      }
    });
  }
}
