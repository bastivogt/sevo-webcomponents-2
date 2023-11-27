"use strict";

class SevoContentBox extends HTMLElement {
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
            --background-color: inherit;
            --padding: 10px;
            --color: inherit;
            --max-width-large: 1200px;
        }

        #container {
            background-color: var(--background-color); 
            padding: var(--padding);
   
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            color: var(--color);
        }

        #inner {
           max-width: var(--max-width-large);
           width: 100%;

        }
    `;
  }

  get _template() {
    return /*html*/ `
        <style>
            ${this._style}
        </style>
        <div id="container">
            <div id="inner">
                <slot></slot>
            </div>
        </div>
    `;
  }

  // observedAttribute
  static get observedAttributes() {
    return ["background-color", "color", "padding"];
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
  // background-color
  get backgroundColor() {
    return this.getAttribute("background-color");
  }
  set backgroundColor(value) {
    this.setAttribute("background-color", value);
  }

  // color
  get color() {
    return this.getAttribute("color");
  }
  set color(value) {
    this.setAttribute("color", value);
  }

  // padding
  get padding() {
    return this.getAttribute("padding");
  }
  set padding(value) {
    this.setAttribute("padding", value);
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

    // color
    if (this.color) {
      this._setCssVar("--color", this.color);
    }

    // padding
    if (this.padding) {
      this._setCssVar("--padding", this.padding);
    }
  }
}

customElements.define("sevo-content-box", SevoContentBox);
