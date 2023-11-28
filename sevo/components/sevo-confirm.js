"use strict";

export class SevoConfirm extends HTMLElement {
  constructor() {
    super();

    this._root = this.attachShadow({ mode: "open" });
    this._root.innerHTML = this._template;

    this._elements = {
      backdrop: this._root.querySelector("#backdrop"),
      confirm: this._root.querySelector("#confirm"),
      slotOK: this._root.querySelector("slot[name='ok']"),
      slotCancel: this._root.querySelector("slot[name='cancel']"),
    };

    this._slideUpFinished = () => {};
    this._slideDownFinished = () => {};
  }

  static get events() {
    return {
      CONFIRM_OPENED: "confirm-opened",
      CONFIRM_CLOSED: "confirm-closed",
      CONFIRM_OK: "confirm-ok",
      CONFIRM_CANCEL: "confirm-cancel",
    };
  }

  get _style() {
    return /*css*/ `
        * {
            box-sizing: border-box;
        }

        :host {
            --background-color: white;
            --backdrop-color: rgba(0, 0, 0, .4);
            --color: inherit;
            --border-radius: 3px;
            --border-color: #ccc;
            --section-padding: 20px 20px;
            --z-index: 9999999;
            --width: 60%;
            --margin-top: 100px;
            --box-shadow: 0px 0px 20px 2px rgba(0,0,0,0.4);
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
            justify-content: center;
            align-items: flex-start;
        }

        #confirm {
            background-color: var(--background-color);
            border-radius: var(--border-radius);
            color: var(--color);
            width: var(--width);
            margin-top: var(--margin-top);
            box-shadow: var(--box-shadow);
        }

        #header {
            border-bottom: 1px solid var(--border-color);
            padding: var(--section-padding);
        }

        #header ::slotted(h1),
        #header ::slotted(h2),
        #header ::slotted(h3),
        #header ::slotted(h4),
        #header ::slotted(h5),
        #header ::slotted(h6) {
            margin: 0;
        }

        #content {
            padding: var(--section-padding);
  
        }

        #footer {
            padding: var(--section-padding);
            border-top: 1px solid var(--border-color);
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            gap: 5px;
        }

        .hidden {
            display: none !important;
        }

        .slide-down {
            animation: slide-down-animation var(--animation-time) ease forwards;
        }

        .slide-up {
            animation: slide-up-animation var(--animation-time) ease forwards;
        }

        @keyframes slide-down-animation {
            0% {
                transform: translateY(-500px);
            }
            100% {
                transform: translateY(0);
            }
        }

        @keyframes slide-up-animation {
            0% {
                transform: translateY(0);
            }
            100% {
                transform: translateY(-500px);
            }
        }

        @media only screen and (max-width: 1200px) {
            :host {
                --width: 80%;
            }
        }

        @media only screen and (max-width: 576px) {
            :host {
                --width: 90%;
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
            <div id="confirm">
                <header id="header">
                    <slot name="header"></slot>
                </header>
                <main id="content">
                    <slot name="content"></slot>
                </main>
                <footer id="footer">
                    <div id="ok"><slot name="ok"><button>OK</button></slot></div>
                    <div id="cancel"><slot name="cancel"><button>Cancel</button></slot></div>
                </footer>
            </div>
        </div>
    `;
  }

  // observedAttribute
  static get observedAttributes() {
    return ["opened", "animated", "backdrop-close"];
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
    if (this.opened) {
      this.open(this.animated);
    } else {
      this.close(false, true);
    }
    this._render();

    // slotOK
    this._elements.slotOK.addEventListener(
      "click",
      this._slotOKClickHandler.bind(this)
    );

    // slotCancel
    this._elements.slotCancel.addEventListener(
      "click",
      this._slotCancelClickHandler.bind(this)
    );

    // animationend
    this._elements.confirm.addEventListener(
      "animationend",
      this._animationEndHandler.bind(this)
    );

    // backdropCloseClick
    if (this.backdropClose) {
      this._elements.backdrop.addEventListener(
        "click",
        this._backdropCloseClickHandler.bind(this)
      );
    }
  }

  // _slotOKClickHandler
  _slotOKClickHandler(evt) {
    console.log("slot OK Clicked");
    this.close(this.animated);
    this.dispatchEvent(new Event(SevoConfirm.events.CONFIRM_OK));
  }

  // slotCancelClickHandler
  _slotCancelClickHandler(evt) {
    console.log("slot Cancel Clicked");
    this.close(this.animated);
    this.dispatchEvent(new Event(SevoConfirm.events.CONFIRM_CANCEL));
  }

  // _animationEndHandler
  _animationEndHandler(evt) {
    if (evt.animationName === "slide-down-animation") {
      this._slideDownFinished();
    }
    if (evt.animationName === "slide-up-animation") {
      this._slideUpFinished();
    }
  }

  _backdropCloseClickHandler(evt) {
    if (evt.target === this._elements.backdrop) {
      this.close(this.animated);
      this.dispatchEvent(new Event(SevoConfirm.events.CONFIRM_CANCEL));
    }
  }

  // disconnectedCAllback
  disconnectedCallback() {}

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

  // backdropClose
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
    console.log("render opened:", this.opened);
    // opened

    // background-color
    if (this.backgroundColor) {
      this._setCssVar("--background-color", this.backgroundColor);
    }
  }

  // open
  open(animated = true, init = false) {
    if (animated) {
      this._elements.backdrop.classList.remove("hidden");
      this._elements.confirm.classList.remove("slide-up");
      this._elements.confirm.classList.add("slide-down");
      document.body.style["overflow-y"] = "hidden";
      this._slideDownFinished = () => {
        if (!init) {
          this.opened = true;
          this.dispatchEvent(new Event(SevoConfirm.events.CONFIRM_OPENED));
        }
      };
    } else {
      this._elements.backdrop.classList.remove("hidden");
      document.body.style["overflow-y"] = "hidden";
      if (!init) {
        this.opened = true;
        this.dispatchEvent(new Event(SevoConfirm.events.CONFIRM_OPENED));
      }
    }
  }

  // close
  close(animated = true, init = false) {
    if (animated) {
      this._elements.confirm.classList.remove("slide-down");
      this._elements.confirm.classList.add("slide-up");
      this._slideUpFinished = () => {
        this._elements.backdrop.classList.add("hidden");
        document.body.style["overflow-y"] = "auto";
        if (!init) {
          this.opened = false;
          this.dispatchEvent(new Event(SevoConfirm.events.CONFIRM_CLOSED));
        }
      };
    } else {
      this._elements.backdrop.classList.add("hidden");
      document.body.style["overflow-y"] = "auto";
      if (!init) {
        this.opened = false;
        this.dispatchEvent(new Event(SevoConfirm.events.CONFIRM_CLOSED));
      }
    }
  }
}

customElements.define("sevo-confirm", SevoConfirm);
