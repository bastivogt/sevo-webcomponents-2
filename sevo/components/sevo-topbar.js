"use strict";

class SevoTopbar extends HTMLElement {
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
            --background-color: white;
            --color: inherit;
            --box-shadow: 0px 4px 15px 0px rgba(0,0,0,0.2);
            --padding: 20px 10px;
        }

        #topbar {
            background-color: var(--background-color);
            box-shadow: var(--box-shadow);
            width: 100%;
            padding: var(--padding);
            color: var(--color);

            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

        }
    `;
  }

  get _template() {
    return /*html*/ `
        <style>
            ${this._style}
        </style>
        <div id="topbar">
            <div id="topbar-left"><slot name="left"></slot></div>
            <div id="topbar-center"><slot name="center"></slot></div>
            <div id="topbar-right"><slot name="right"></slot></div>
        </div>
    `;
  }

  // observedAttribute
  static get observedAttributes() {
    return [];
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

  // CSS vars
  _getCssVar(name) {
    const styles = getComputedStyle(this);
    return styles.getPropertyValue(name);
  }

  _setCssVar(name, value) {
    this.style.setProperty(name, value);
  }

  // _render
  _render() {}
}

customElements.define("sevo-topbar", SevoTopbar);
