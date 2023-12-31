"use strict";

export class SevoLightbox extends HTMLElement {
  constructor() {
    super();

    this._root = this.attachShadow({ mode: "open" });
    //this._root.appendChild(template.content.cloneNode(true));
    this._root.innerHTML = this._template;

    this._elements = {
      backdrop: this._root.querySelector("#backdrop"),
      slotClose: this._root.querySelector("slot[name='close'"),
      close: this._root.querySelector("#close"),
    };

    this._fadeInFinished = () => {};
    this._fadeOutFinished = () => {};
  }

  // style
  get _style() {
    return /*css*/ `
      * {
          box-sizing: border-box;
      }

      :host {
          --background-color: rgba(0, 0, 0, .9);
          --z-index: 999983;
          --color: white;
          --animation-time: .3s;
      }

      #backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;

          background-color: var(--background-color);

          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          z-index: var(--z-index);
      }

      #close {
          position: absolute;
          top: 10px;
          right: 10px;
          color: var(--color);
      }

      #content {
          color: var(--color);
      }

      .hidden {
          display: none !important;
      }


      .fade-in {
          animation: fade-in-animation var(--animation-time) ease forwards;
      }

      .fade-out {
          animation: fade-out-animation var(--animation-time) ease forwards;
      }


      @keyframes fade-in-animation {
          0% {
              opacity: 0;
          }
          100% {
              opacity: 1;
          }
      }

      @keyframes fade-out-animation {
          0% {
              opacity: 1;
          }
          100% {
              opacity: 0;
          }
      }
    `;
  }

  //  _template
  get _template() {
    return /*html*/ `
        <style>
            ${this._style}
        </style>
      <div id="backdrop">
        <div id="close"><slot name="close"><button>x</button></slot></div>
        <div id="content"><slot name="content"></slot></div>
      </div>
    `;
  }
  // Props
  // opened
  get opened() {
    const value = this.getAttribute("opened");
    if (value === "true" || value === "") {
      return true;
    } else {
      return false;
    }
  }

  set opened(value) {
    if (value === true) {
      this.setAttribute("opened", "");
    } else {
      this.removeAttribute("opened");
    }
  }

  // animated
  get animated() {
    const value = this.getAttribute("animated");
    if (value === "true" || value === "") {
      return true;
    } else {
      return false;
    }
  }

  set animated(value) {
    if (value === true) {
      this.setAttribute("animated", "");
    } else {
      this.removeAttribute("animated");
    }
  }

  // events
  static get events() {
    return {
      LIGHTBOX_OPENED: "light-box-opened",
      LIGHTBOX_CLOSED: "light-box-closed",
    };
  }

  // connectedCallback
  connectedCallback() {
    this.close(false, true);
    //this.close(false, true);
    if (this.opened) {
      this.open(this.animated);
    } else {
      this.close(false, true);
    }
    this._render();

    // close
    this._elements.slotClose.addEventListener(
      "click",
      this._slotCloseClickHandler.bind(this)
    );

    // fade
    this._elements.backdrop.addEventListener(
      "animationend",
      this._backdropAnimationEndHandler.bind(this)
    );
  }

  // disconnectedCallback
  disconnectedCallback() {
    this._elements.slotClose.removeEventListener(
      "click",
      this._slotCloseClickHandler
    );

    this._elements.backdrop.removeEventListener(
      "animationend",
      this._backdropAnimationEndHandler
    );
  }

  // handler
  // _backdropAnimationEndHandler
  _backdropAnimationEndHandler(evt) {
    if (evt.animationName === "fade-out-animation") {
      this._fadeOutFinished();
    }

    if (evt.animationName === "fade-in-animation") {
      this._fadeInFinished();
    }
  }

  // slotCloseClickHandler
  _slotCloseClickHandler(evt) {
    this.close(this.animated);
  }

  // observedAttributes
  static get observedAttributes() {
    return ["opened", "animated"];
  }

  // attributeChangedCallback
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
    this._render();
  }

  // _render
  _render() {
    /*     if (this.opened) {
      this.open(this.animated);
    } else {
      this.close(this.animated);
    } */
  }

  // CSS vars
  _getCssVar(name) {
    const styles = getComputedStyle(this);
    return styles.getPropertyValue(name);
  }

  _setCssVar(name, value) {
    this.style.setProperty(name, value);
  }

  // open
  open(animated = true, init = false) {
    if (animated) {
      this._elements.backdrop.classList.remove("hidden");
      document.body.style["overflow-y"] = "hidden";
      this._elements.backdrop.classList.remove("fade-out");
      this._elements.backdrop.classList.add("fade-in");
      this._fadeInFinished = () => {
        if (!init) {
          this.opened = true;
          this.dispatchEvent(new Event(SevoLightbox.events.LIGHTBOX_OPENED));
        }
      };

      //this.opened = true;
    } else {
      this._elements.backdrop.classList.remove("hidden");
      document.body.style["overflow-y"] = "hidden";
      console.log("open na");
      if (!init) {
        this.dispatchEvent(new Event(SevoLightbox.events.LIGHTBOX_OPENED));
        this.opened = true;
      }
    }
  }

  // close
  close(animated = true, init = false) {
    if (animated) {
      this._elements.backdrop.classList.remove("fade-in");
      this._elements.backdrop.classList.add("fade-out");

      this._fadeOutFinished = () => {
        this._elements.backdrop.classList.add("hidden");
        document.body.style["overflow-y"] = "auto";
        if (!init) {
          this.opened = false;
          this.dispatchEvent(new Event(SevoLightbox.events.LIGHTBOX_CLOSED));
        }
      };
    } else {
      this._elements.backdrop.classList.add("hidden");
      document.body.style["overflow-y"] = "auto";
      if (!init) {
        this.dispatchEvent(new Event(SevoLightbox.events.LIGHTBOX_CLOSED));
        this.opened = false;
      }
    }
  }
}

customElements.define("sevo-lightbox", SevoLightbox);
