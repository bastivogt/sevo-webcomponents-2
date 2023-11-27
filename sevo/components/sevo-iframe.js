"use strict";

class SevoIframe extends HTMLElement {
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
            --height-large: 500px;
            --height-medium: 400px;
            --height-small: 300px;
        }

        #container {
            height: var(--height);
        }

        #container ::slotted(iframe) {
            width: 100vw;
            max-width: 100%;
            height: var(--height-large);
        }

        @media only screen and (max-width: 768px) {
            #container {
                height: var(--height-medium);
            }

            #container ::slotted(iframe) {
                height: var(--height-medium);
            }
        }

        @media only screen and (max-width: 576px) {
            #container {
                height: var(--height-small);
            }
            #container ::slotted(iframe) {
                height: var(--height-small);
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
            <slot></slot>
        </div>
    `;
  }

  // observedAttribute
  static get observedAttributes() {
    return ["height"];
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
  // height-large
  get heightLarge() {
    return this.getAttribute("height-large");
  }
  set heightLarge(value) {
    this.setAttribute("height-large", value);
  }

  // height-medium
  get heightMedium() {
    return this.getAttribute("height-medium");
  }
  set heightMedium(value) {
    this.setAttribute("height-medium", value);
  }

  // height-small
  get heightSmall() {
    return this.getAttribute("height-small");
  }
  set heightSmall(value) {
    this.setAttribute("height-small");
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
    // gheight-large
    if (this.heightLarge) {
      this._setCssVar("--height-large", this.heightLarge);
    }

    // height-medium
    if (this.heightMedium) {
      this._setCssVar("--height-medium", this.heightMedium);
    }

    // height-small
    if (this.heightSmall) {
      this._setCssVar("--height-small", this.heightSmall);
    }
  }
}

customElements.define("sevo-iframe", SevoIframe);
