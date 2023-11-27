"use strict";

class SevoFLexContainer extends HTMLElement {
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
            --flex-direction-large: row;
            --justify-content-large: flex-start;
            --align-items-large: flex-start;

            --flex-direction-medium: row;
            --justify-content-medium: flex-start;
            --align-items-medium: flex-start;

            --flex-direction-small: row;
            --justify-content-small: flex-start;
            --align-items-small: flex-start;

        }

        #container {
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: var(--flex-direction-large);
            justify-content: var(--justify-content-large);
            align-items: var(--align-items-large);
        }

        @media only screen and (max-width: 768px) {
            #container {
                flex-direction: var(--flex-direction-medium);
                justify-content: var(--justify-content-medium);
                align-items: var(--align-items-medium);
            }
        }

        @media only screen and (max-width: 576px) {
            #container {
                flex-direction: var(--flex-direction-small);
                justify-content: var(--justify-content-small);
                align-items: var(--align-items-small);
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
  // justify-content-large
  get justifyContentLarge() {
    return this.getAttribute("justify-content-large");
  }
  set justifyContentLarge(value) {
    this.setAttribute("justify-content-large", value);
  }
  // flex-direction-large
  get flexDirectionLarge() {
    return this.getAttribute("flex-direction-large");
  }
  set flexDirectionLarge(value) {
    this.setAttribute("flex-direction-large", value);
  }
  // align-items-large
  get alignItemsLarge() {
    return this.getAttribute("align-items-large");
  }
  set alignItemsLarge(value) {
    this.setAttribute("align-items-large", value);
  }

  // justify-content-medium
  get justifyContentMedium() {
    return this.getAttribute("justify-content-medium");
  }
  set justifyContentMedium(value) {
    this.setAttribute("justify-content-medium", value);
  }
  // flex-direction-medium
  get flexDirectionMedium() {
    return this.getAttribute("flex-direction-medium");
  }
  set flexDirectionMedium(value) {
    this.setAttribute("flex-direction-medium", value);
  }
  // align-items-medium
  get alignItemsMedium() {
    return this.getAttribute("align-items-medium");
  }
  set alignItemsMedium(value) {
    this.setAttribute("align-items-medium", value);
  }

  // justify-content-small
  get justifyContentSmall() {
    return this.getAttribute("justify-content-small");
  }
  set justifyContentSmall(value) {
    this.setAttribute("justify-content-small", value);
  }
  // flex-direction-small
  get flexDirectionSmall() {
    return this.getAttribute("flex-direction-small");
  }
  set flexDirectionSmall(value) {
    this.setAttribute("flex-direction-small", value);
  }
  // align-items-small
  get alignItemsSmall() {
    return this.getAttribute("align-items-small");
  }
  set alignItemsSmall(value) {
    this.setAttribute("align-items-small", value);
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
    // justify-content-large
    if (this.justifyContentLarge) {
      this._setCssVar("--justify-content-large", this.justifyContentLarge);
    }
    // flex-direction-large
    if (this.flexDirectionLarge) {
      this._setCssVar("--flex-direction-large", this.flexDirectionLarge);
    }
    // align-items-large
    if (this.alignItemsLarge) {
      this._setCssVar("--align-items-large", this.alignItemsLarge);
    }

    // justify-content-medium
    if (this.justifyContentMedium) {
      this._setCssVar("--justify-content-medium", this.justifyContentMedium);
    }
    // flex-direction-medium
    if (this.flexDirectionMedium) {
      this._setCssVar("--flex-direction-medium", this.flexDirectionMedium);
    }
    // align-items-medium
    if (this.alignItemsMedium) {
      this._setCssVar("--align-items-medium", this.alignItemsMedium);
    }

    // justify-content-small
    if (this.justifyContentSmall) {
      this._setCssVar("--justify-content-small", this.justifyContentSmall);
    }
    // flex-direction-small
    if (this.flexDirectionSmall) {
      this._setCssVar("--flex-direction-small", this.flexDirectionSmall);
    }
    // align-items-small
    if (this.alignItemsSmall) {
      this._setCssVar("--align-items-small", this.alignItemsSmall);
    }
  }
}

customElements.define("sevo-flex-container", SevoFLexContainer);
