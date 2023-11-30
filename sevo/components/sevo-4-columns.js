"use strict";

class Sevo4Columns extends HTMLElement {
  constructor() {
    super();

    this._root = this.attachShadow({ mode: "open" });
    this._root.innerHTML = this._template;

    this._elements = {};
  }

  get _style() {
    return /*css*/ `
        * {
            box-sizing: border-box;
        }

        :host {
            --background-color: transparent;
            --justify-content: flex-start;
            --align-items: center;
            --gap: 20px;
        }

        #container {
            background-color: var(--background-color);
            display: flex;
            flex-direction: row;
            gap: var(--gap);
            justify-content: var(--justify-content);
            align-items: var(--align-items);
        }

        .item {
            width: 100%;
            flex: 1 1 0;
        }

        @media only screen and (max-width: 992px) {
            #container {
                flex-direction: column;
            }
        }
    `;
  }

  get _template() {
    return /*html*/ `
        <style>
            ${this._style}
        </style>
        <div id="container">
            <div class="item" id="column-1">
                <slot name="column-1"></slot>
            </div>
            <div class="item" id="column-2">
                <slot name="column-2"></slot>
            </div>
            <div class="item" id="column-3">
                <slot name="column-3"></slot>
            </div>
            <div class="item" id="column-4">
                <slot name="column-4"></slot>
            </div>
        </div>
    `;
  }

  // observedAttribute
  static get observedAttributes() {
    return ["background-color", "gap", "justify-content", "align-items"];
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

  // disconnectedCAllback
  disconnectedCallback() {}

  // Properties
  // opened
  // background-color
  get backgroundColor() {
    return this.getAttribute("background-color");
  }
  set backgroundColor(value) {
    this.setAttribute("background-color", value);
  }

  // gap
  get gap() {
    return this.getAttribute("gap");
  }
  set gap(value) {
    this.setAttribute("gap", value);
  }

  // justify-content
  get justifyContent() {
    return this.getAttribute("justify-content");
  }
  set justifyContent(value) {
    this.setAttribute("justify-content", value);
  }

  // alignItems
  get alignItems() {
    return this.getAttribute("align-items");
  }
  set alignItems(value) {
    this.setAttribute("align-items", value);
  }

  // CSS vars
  _getCssVar(name) {
    const styles = getComputedStyle(this);
    return styles.getPropertyValue(name);
  }

  _setCssVar(name, value) {
    this.style.setProperty(name, value);
  }

  // _render
  _render() {
    // background-color
    if (this.backgroundColor) {
      this._setCssVar("--background-color", this.backgroundColor);
    }

    // gap
    if (this.gap) {
      this._setCssVar("--gap", this.gap);
    }

    // justify-content
    if (this.justifyContent) {
      this._setCssVar("--justify-content", this.justifyContent);
    }

    // align-items
    if (this.alignItems) {
      this._setCssVar("--align-items", this.alignItems);
    }
  }
}

customElements.define("sevo-4-columns", Sevo4Columns);
