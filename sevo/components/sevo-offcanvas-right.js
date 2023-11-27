"use strict";

export class SevoOffcanvasRight extends HTMLElement {
  constructor() {
    super();

    this._root = this.attachShadow({ mode: "open" });
    this._root.innerHTML = this._template;

    this._elements = {
      backdrop: this._root.querySelector("#backdrop"),
      offcanvas: this._root.querySelector("#offcanvas"),
      slotClose: this._root.querySelector("slot[name='close']"),
    };

    this._slideInFinished = () => {};
    this._slideOutFinished = () => {};
  }

  get _style() {
    return /*css*/ `
        * {
            box-sizing: border-box;
        }

        :host {
            --backdrop-color: rgba(0, 0, 0, .6);
            --background-color: black;
            --z-index: 99999;
            --width: 700px;
            --box-shadow: 4px 0px 15px 0px rgba(0, 0, 0, 0.4);
            --color: white;
            --animation-time: .3s;
        }

        #backdrop {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: var(--z-index);
            background-color: var(--backdrop-color);

            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            

        }

        #close {
            position: absolute;
            top: 10px;
            left: 10px;
            color: var(--color);
        }

        #offcanvas {
            background-color: var(--background-color);
            width: var(--width);
            position: relative;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            box-shadow: var(--box-shadow);
            color: var(--color);    
        }

        .opened {
            transform: translateX(0px);
        }

        .closed {
            transform: translateX(calc(var(--width)));
        }

        .hidden {
            display: none !important;
        }

        .slide-in {
            animation: slide-in-animation var(--animation-time) ease forwards; 
        }

        .slide-out {
            animation: slide-out-animation var(--animation-time) ease forwards; 
        }

        @keyframes slide-in-animation {
            0% {
                transform: translateX(calc(var(--width)));
            }
            100% {
                transform: translateX(0px);
            }
        }

        @keyframes slide-out-animation {
            0% {
                transform: translateX(0px);
            }
            100% {
                transform: translateX(calc(var(--width)));
            }
        }




        @media only screen and (max-width: 1200px) {

        }

        @media only screen and (max-width: 992px) {

        }

        @media only screen and (max-width: 768px) {
          :host {
            --width: 500px;
          }
        } 

        @media only screen and (max-width: 576px) {
          :host {
            --width: 300px;
          }
        } 

        @media only screen and (max-width: 350px) {
          :host {
            --width: 200px;
          }
        } 
    `;
  }

  get _template() {
    return /*html*/ `
        <style>
            ${this._style}
        </style>
        <div id="backdrop">
        
            <div id="offcanvas">
                <div id="close"><slot name="close"><button>x</button></slot></div>
                <div id="content"><slot name="content"></slot></div>
            </div>
        </div>
    `;
  }

  static get events() {
    return {
      OFFCANVAS_OPENED: "ofcanvas-opened",
      OFFCANVAS_CLOSED: "offcanvas-closed",
    };
  }

  // observedAttribute
  static get observedAttributes() {
    return [
      "opened",
      "backgdrop-color",
      "background-color",
      "backdrop-close",
      "animated",
      "animation-time",
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
    this.close(false, true);
    this._render();

    // slotClose
    this._elements.slotClose.addEventListener(
      "click",
      this._slotCloseClickHandler.bind(this)
    );

    // animationEnd
    this._elements.offcanvas.addEventListener(
      "animationend",
      this._offcanvasAnimationEndHandler.bind(this)
    );

    // backdropcloseClick
    if (this.backdropClose) {
      this._elements.backdrop.addEventListener(
        "click",
        this._backdropClickHandler.bind(this)
      );
    }
  }

  // slotCloseClickHandler
  _slotCloseClickHandler(evt) {
    console.log("slotClose clicked");
    this.close(this.animated);
  }

  _offcanvasAnimationEndHandler(evt) {
    if (evt.animationName === "slide-in-animation") {
      this._slideInFinished();
    }

    if (evt.animationName === "slide-out-animation") {
      this._slideOutFinished();
    }
  }

  // backdropClickHandler
  _backdropClickHandler(evt) {
    if (evt.target === this._elements.backdrop) {
      this.close(this.animated);
    }
  }

  // disconnectedCAllback
  disconnectedCallback() {
    // slotClose
    this._elements.slotClose.removeEventListener(
      "click",
      this._slotCloseClickHandler
    );

    // animationEnd
    this._elements.offcanvas.removeEventListener(
      "animationend",
      this._offcanvasAnimationEndHandler
    );

    // backdropcloseClick
    if (this.backdropClose) {
      this._elements.backdrop.removeEventListener(
        "click",
        this._backdropClickHandler
      );
    }
  }

  // Properties
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

  // backdrop-close
  get backdropClose() {
    const value = this.getAttribute("backdrop-close");
    if (value === "true" || value === "") {
      return true;
    } else {
      return false;
    }
  }

  set backdropClose(value) {
    if (value === true) {
      this.setAttribute("backdrop-close", "");
    } else {
      this.removeAttribute("backdrop-close");
    }
  }

  // background-color
  get backgroundColor() {
    return this.getAttribute("background-color");
  }

  set backgroundColor(value) {
    this.setAttribute("background-color", value);
  }

  // backdrop-color
  get backDropColor() {
    return this.getAttribute("backdrop-color");
  }

  set backDropColor(value) {
    this.setAttribute("backdrop-color", value);
  }

  // animation-time
  get animationTime() {
    return this.getAttribute("animation-time");
  }

  set animationTime(value) {
    this.setAttribute("animation-time", value);
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
    if (this.opened) {
      this.open(this.animated);
    } else {
      this.close(this.animated);
    }

    // background-color
    if (this.backgroundColor) {
      this._setCssVar("--background-color", this.backgroundColor);
    }

    // backdrop-color
    if (this.backDropColor) {
      this._setCssVar("--backdrop-color", this.backDropColor);
    }

    // animation-time
    if (this.animationTime) {
      this._setCssVar("--animation-time", this.animationTime);
    }
  }

  // open
  open(animated = true, noEvents = false) {
    if (animated) {
      this._elements.backdrop.classList.remove("hidden");
      this._elements.offcanvas.classList.remove("slide-out");
      this._elements.offcanvas.classList.add("slide-in");
      document.body.style["overflow-y"] = "hidden";
      this._slideInFinished = () => {
        if (!noEvents) {
          this.opened = true;
          this.dispatchEvent(
            new Event(SevoOffcanvasRight.events.OFFCANVAS_OPENED)
          );
        }
      };
    } else {
      this._elements.backdrop.classList.remove("hidden");
      this._elements.offcanvas.classList.remove("closed");
      this._elements.offcanvas.classList.add("opened");
      document.body.style["overflow-y"] = "hidden";

      if (!noEvents) {
        this.opened = true;
        this.dispatchEvent(
          new Event(SevoOffcanvasRight.events.OFFCANVAS_OPENED)
        );
      }
    }
  }

  close(animated = true, noEvents = false) {
    if (animated) {
      this._elements.offcanvas.classList.remove("opened");
      this._elements.offcanvas.classList.remove("slide-in");
      this._elements.offcanvas.classList.add("slide-out");
      document.body.style["overflow-y"] = "auto";
      this._slideOutFinished = () => {
        this._elements.backdrop.classList.add("hidden");

        if (!noEvents) {
          this.opened = false;
          this.dispatchEvent(
            new Event(SevoOffcanvasRight.events.OFFCANVAS_CLOSED)
          );
        }
      };
    } else {
      this._elements.offcanvas.classList.remove("opened");
      this._elements.offcanvas.classList.add("closed");
      this._elements.backdrop.classList.add("hidden");
      document.body.style["overflow-y"] = "auto";

      if (!noEvents) {
        this.opened = false;
        this.dispatchEvent(
          new Event(SevoOffcanvasRight.events.OFFCANVAS_CLOSED)
        );
      }
    }
  }
}

customElements.define("sevo-offcanvas-right", SevoOffcanvasRight);
