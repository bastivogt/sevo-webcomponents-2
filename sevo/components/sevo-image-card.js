"use strict";

class SevoImageCard extends HTMLElement {
  constructor() {
    super();

    this._root = this.attachShadow({ mode: "open" });
    this._root.innerHTML = this._template;

    this._elements = {
      image: this._root.querySelector("#image"),
    };
  }

  get _style() {
    return /*css*/ `
        * {
            box-sizing: border-box;
        }

        :host {
            --background-color: transparent;
            --padding: 10px;
            --color: white;
            --border-radius: 4px;
            --aspect-ratio: 4 / 3;
            --overflow-gradient: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .7) 100%);
            --box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.4);
            --margin: 20px;
        }

        #card {
            background-color: var(--background-color);
            aspect-ratio: var(--aspect-ratio);
            position: relative;

            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: flex-end;
            padding: var(--padding);
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            margin: var(--margin);
        }

        #image {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            
            width: 100%;
            height: 100%;


            object-fit: cover;
            z-index: 0;
            border-radius: var(--border-radius);
        }

        #card::before {
            content: " ";
            display:block;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
 
            z-index: 1;

            background-image: var(--overflow-gradient);
            background-position: 0% 0%;
            background-size: cover;

            border-radius: var(--border-radius);

        }



        #title ::slotted(h1),
        #title ::slotted(h2),
        #title ::slotted(h3),
        #title ::slotted(h4),
        #title ::slotted(h5),
        #title ::slotted(h6) {
            margin: 0;
            padding: 0;
        }

        #title {
            position: relative;
            z-index: 1;
            color: var(--color);
            z-index: 2;


        }
    `;
  }

  get _template() {
    return /*html*/ `
        <style>
            ${this._style}
        </style>
        <div id="card">
            <img id="image" src="" alt="" title="" />
            <div id="title">
                <slot name="title"></slot>
            </div>

        </div>
    `;
  }

  // observedAttribute
  static get observedAttributes() {
    return ["src", "alt", "title"];
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
  // img-src
  get src() {
    return this.getAttribute("src");
  }
  set src(value) {
    this.setAttribute("src", value);
  }

  // alt
  get alt() {
    return this.getAttribute("alt");
  }
  set alt(value) {
    this.setAttribute("alt", value);
  }

  // title
  get title() {
    return this.getAttribute("title");
  }
  set title(value) {
    this.setAttribute("title", value);
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
    // src
    if (this.src) {
      this._elements.image.setAttribute("src", this.src);
    }

    // alt
    if (this.alt) {
      this._elements.image.setAttribute("alt", this.alt);
    }

    // title
    if (this.title) {
      this._elements.image.setAttribute("title", this.title);
    }
  }
}

customElements.define("sevo-image-card", SevoImageCard);
