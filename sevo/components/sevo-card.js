"use strict";

class SevoCard extends HTMLElement {
  constructor() {
    super();

    this._root = this.attachShadow({ mode: "open" });
    this._root.innerHTML = this._template;
    this._elements = {
      slotHeader: this._root.querySelector("slot[name='header']"),
      header: this._root.querySelector("#card-header"),

      slotImg: this._root.querySelector("slot[name='img']"),
      img: this._root.querySelector("#card-img"),

      slotFooter: this._root.querySelector("slot[name='footer']"),
      footer: this._root.querySelector("#card-footer"),
    };
  }

  get _style() {
    return /*css*/ `
        * {
            box-sizing: border-box;
        }

        :host {
            --background-color: white;
            --section-padding: 20px 10px;
            --border-color: #ddd;
            --box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.4);
            --margin: 20px;
            --border-radius: 4px;

        }

        #card {
            background-color: var(--background-color);
            box-shadow: var(--box-shadow);
            margin: var(--margin);
            border-radius: var(--border-radius);
            
        }

        #card-header {
            padding: var(--section-padding);
            border-bottom: 1px solid var(--border-color);
        }



        #card-content {
            padding: var(--section-padding);
        }

        #card-footer {
            padding: var(--section-padding);
            border-top: 1px solid var(--border-color);
        }

        #card-header ::slotted(h1),
        #card-header ::slotted(h2),
        #card-header ::slotted(h3),
        #card-header ::slotted(h4),
        #card-header ::slotted(h5),
        #card-header ::slotted(h6),
        #card-content ::slotted(p),
        #card-footer ::slotted(p)
        {
            margin: 0;
            padding: 0;
        }

        #card-img ::slotted(img) {
            width: 100%;
            height: auto;
            border-top-left-radius: var(--border-radius);
            border-top-right-radius: var(--border-radius);
        }
    `;
  }

  get _template() {
    return /*html*/ `
        <style>
            ${this._style}
        </style>
        <div id="card">
            <header id="card-header">
                <slot name="header"></slot>
            </header>
            <header id="card-img">
                <slot name="img"></slot>
            </header>
            <main id="card-content">
                <slot name="content">Content</slot>
            </main>
            <footer id="card-footer">
                <slot name="footer">Footer</slot>
            </footer>
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
  _render() {
    if (this._elements.slotHeader.assignedElements().length === 0) {
      this._elements.header.remove();
    }

    if (this._elements.slotImg.assignedElements().length === 0) {
      this._elements.img.remove();
    }

    if (this._elements.slotFooter.assignedElements().length === 0) {
      this._elements.footer.remove();
    }
  }
}

customElements.define("sevo-card", SevoCard);
