"use strict";

class SevoSection extends HTMLElement {
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
            --padding: 75px 0px;
            --img-src: "";
            --justify-content: center;
            --align-items: flex-start;
            --height: inherit; 
            --color: inherit;
            --img-attachment: scroll;
            --inner-width: 1200px;
            --overlay-background: none;
            --overlay-opacity: 0;
            --overlay-blend-mode: normal;
            --overlay-attachment: scroll;
        }

        #section {
            background-color: var(--background-color);
            padding: var(--padding);
            display: flex;
            flex-direction: row;
            justify-content: var(--justify-content);
            align-items: var(--align-items);
            height: var(--height);
            color: var(--color);

            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            background-attachment: var(--img-attachment);
            background-image: var(--img-src);
            position: relative;
        }



        #overlay {
          background: var(--overlay-background);
          opacity: var(--overlay-opacity);
          position: absolute;
          background-attachment: var(--overlay-attachment);
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          z-index: 1;
          mix-blend-mode: var(--overlay-blend-mode);

        }

        #inner {
          max-width: var(--inner-width);
          width: 100%;
          flex: 1 1 0;
          z-index: 2;
        }
    `;
  }

  get _template() {
    return /*html*/ `
        <style>
            ${this._style}
        </style>
        <section id="section">
          <div id="overlay"></div>
              <div id="inner">
                  <slot></slot>
              </div>
            
        </section>
    `;
  }

  // observedAttribute
  static get observedAttributes() {
    return [
      "background-color",
      "color",
      "justify-content",
      "align-items",
      "height",
      "img-src",
      "img-attachment",
      "padding",
      "overlay-background",
      "overlay-opacity",
      "overlay-blend-mode",
      "overlay-attachment",
    ];
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

  // justify-content
  get justifyContent() {
    return this.getAttribute("justify-content");
  }
  set justifyContent(value) {
    this.setAttribute("justify-content", value);
  }

  // align-items
  get alignItems() {
    return this.getAttribute("align-items");
  }
  set alignItems(value) {
    this.setAttribute("align-items", value);
  }

  // height
  get height() {
    return this.getAttribute("height");
  }
  set height(value) {
    this.setAttribute("height", value);
  }

  // img-src
  get imgSrc() {
    return this.getAttribute("img-src");
  }
  set imgSrc(value) {
    this.setAttribute("img-src", value);
  }

  // img-attachment
  get imgAttachment() {
    return this.getAttribute("img-attachment");
  }
  set imgAttachment(value) {
    this.setAttribute("img-attachment", value);
  }

  // padding
  get padding() {
    return this.getAttribute("padding");
  }
  set padding(value) {
    this.setAttribute("padding", value);
  }

  // overlay-background
  get overlayBackground() {
    return this.getAttribute("overlay-background");
  }
  set overlayBackground(value) {
    this.setAttribute("overlay-background", value);
  }

  // overlay-opacity
  get overlayOpacity() {
    return this.getAttribute("overlay-opacity");
  }
  set overlayOpacity(value) {
    this.setAttribute("overlay-opacity", value);
  }

  // overlay-blend-mode
  get overlayBlendMode() {
    return this.getAttribute("overlay-blend-mode");
  }
  set overlayBlendMode(value) {
    this.setAttribute("overlay-blend-mode", value);
  }

  // overlay-attachment
  get overlayAttachment() {
    return this.getAttribute("overlay-attachment");
  }
  set overlayAttachment(value) {
    this.setAttribute("overlay-attachment", value);
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
    // opened

    // background-color
    if (this.backgroundColor) {
      this._setCssVar("--background-color", this.backgroundColor);
    }

    // color
    if (this.color) {
      this._setCssVar("--color", this.color);
    }

    // justify-content
    if (this.justifyContent) {
      this._setCssVar("--justify-content", this.justifyContent);
    }

    // align-items
    if (this.alignItems) {
      this._setCssVar("--align-items", this.alignItems);
    }

    // height
    if (this.height) {
      this._setCssVar("--height", this.height);
    }

    // img-src
    if (this.imgSrc) {
      this._setCssVar("--img-src", this.imgSrc);
    }

    // img-attachment
    if (this.imgAttachment) {
      this._setCssVar("--img-attachment", this.imgAttachment);
    }

    // padding
    if (this.padding) {
      this._setCssVar("--padding", this.padding);
    }

    // overlay-background
    if (this.overlayBackground) {
      this._setCssVar("--overlay-background", this.overlayBackground);
    }

    // overlay-opacity
    if (this.overlayOpacity) {
      console.log("opacity overlay");
      this._setCssVar("--overlay-opacity", this.overlayOpacity);
    }

    // overlay-blend-mode
    if (this.overlayBlendMode) {
      this._setCssVar("--overlay-blend-mode", this.overlayBlendMode);
    }

    // overlay-attachment
    if (this.overlayAttachment) {
      this._setCssVar("--overlay-attachment", this.overlayAttachment);
    }
  }
}

customElements.define("sevo-section", SevoSection);
