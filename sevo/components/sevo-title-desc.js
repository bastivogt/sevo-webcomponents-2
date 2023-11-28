"use strict";

class SevoTitleDesc extends HTMLElement {
  constructor() {
    super();
  }

  // observedAttribute
  static get observedAttributes() {
    return ["title", "description"];
  }

  // attributeChangedCallback
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    this._render();
  }

  // connectedCallback
  connectedCallback() {
    this._render();
  }

  // Properties
  // title
  get title() {
    return this.getAttribute("title");
  }
  set title(value) {
    this.setAttribute("title", value);
  }

  // description
  get description() {
    return this.getAttribute("description");
  }
  set description(value) {
    this.setAttribute("description", value);
  }

  // _render
  _render() {
    this._elements = {
      title: document.title,
      description: document.querySelector("meta[name='description']"),
    };
    // title
    if (this.title) {
      document.title = this.title;
    }

    // description
    if (this.description) {
      if (this._elements.description) {
        this._elements.description.setAttribute("content", this.description);
      } else {
        const desc = document.createElement("meta");
        desc.setAttribute("name", "description");
        desc.setAttribute("content", this.description);
        document.head.appendChild(desc);
      }
    }
  }
}

customElements.define("sevo-title-desc", SevoTitleDesc);
