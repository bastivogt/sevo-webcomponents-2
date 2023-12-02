"use strict";

class SevoLinkAnimated extends HTMLElement {
  constructor() {
    super();

    this._root = this.attachShadow({ mode: "open" });
    this._root.innerHTML = this._template;

    this._elements = {
      link: this._root.querySelector("#link"),
    };
  }

  get _style() {
    return /*css*/ `
        * {
            box-sizing: border-box;
        }

        :host {
            --animation-time: .3s;
            --transform-start: scale(1);
            --transform-end: scale(1.1);
            --filter-start: blur(3px);
            --filter-end: blur(0);
        }

        #container {

        }

        #link {
          display: block;
          transform: var(--transform-start);
          filter: var(--filter-start);
          transition: all var(--animation-time) ease;

        }

        #link:hover,
        #link.active {
          transform: var(--transform-end);
          filter: var(--filter-end);

        }
    `;
  }

  get _template() {
    return /*html*/ `
        <style>
            ${this._style}
        </style>
          <a id="link">
              <slot></slot>
          </a>
    `;
  }

  // observedAttribute
  static get observedAttributes() {
    return ["href", "title", "target"];
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
  // href
  get href() {
    return this.getAttribute("href");
  }
  set href(value) {
    this.setAttribute("href", value);
  }

  // target
  get target() {
    return this.getAttribute("target");
  }
  set target(value) {
    this.setAttribute("target", value);
  }

  // title
  get title() {
    return this.getAttribute("title");
  }
  set title(value) {
    this.getAttribute("title", value);
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
    // href
    if (this.href) {
      this._elements.link.setAttribute("href", this.href);
    }
    // target
    if (this.target) {
      this._elements.link.setAttribute("target", this.target);
    }
    // title
    if (this.title) {
      this._elements.link.setAttribute("title", this.title);
    }
  }
}

customElements.define("sevo-link-animated", SevoLinkAnimated);
