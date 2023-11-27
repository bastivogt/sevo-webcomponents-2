"use strict";
import { SevoOffcanvasLeft } from "./sevo/components/sevo-offcanvas-left.js";

import "./sevo/components/init.js";
console.log("index.js");

const mainNavTrigger = document.querySelector("#main-nav-trigger");
const mainNavLightbox = document.querySelector("#main-nav-lightbox");
const mainNavOffcanvasLeft = document.querySelector("#main-nav-offcanvas-left");
mainNavTrigger.addEventListener("click", () => {
  //mainNavLightbox.open(mainNavLightbox.animated);
  mainNavOffcanvasLeft.open();
});

mainNavOffcanvasLeft.addEventListener(
  SevoOffcanvasLeft.events.OFFCANVAS_OPENED,
  () => {
    console.log(SevoOffcanvasLeft.events.OFFCANVAS_OPENED);
  }
);

mainNavOffcanvasLeft.addEventListener(
  SevoOffcanvasLeft.events.OFFCANVAS_CLOSED,
  () => {
    console.log(SevoOffcanvasLeft.events.OFFCANVAS_CLOSED);
  }
);