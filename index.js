"use strict";
import { SevoOffcanvasLeft } from "./sevo/components/sevo-offcanvas-left.js";
import { SevoOffcanvasRight } from "./sevo/components/sevo-offcanvas-right.js";

import { SevoConfirm } from "./sevo/components/sevo-confirm.js";

import "./sevo/components/init.js";
import { SevoLightbox } from "./sevo/components/sevo-lightbox.js";

import { SevoContentFilter } from "./sevo/utils/SevoContentFilter.js";

console.log("index.js");

const mainNavTrigger = document.querySelector("#main-nav-trigger");
const mainNavLightbox = document.querySelector("#main-nav-lightbox");
const mainNavOffcanvasLeft = document.querySelector("#main-nav-offcanvas-left");
const mainNavOffcanvasRight = document.querySelector(
  "#main-nav-offcanvas-right"
);
mainNavTrigger.addEventListener("click", () => {
  //mainNavLightbox.open(mainNavLightbox.animated);
  //mainNavOffcanvasLeft.open(mainNavOffcanvasLeft.animated);
  mainNavOffcanvasRight.open(mainNavOffcanvasRight.animated);
});

// lightbox
mainNavLightbox.addEventListener(SevoLightbox.events.LIGHTBOX_OPENED, () => {
  console.log("lightbox open");
});

mainNavLightbox.addEventListener(SevoLightbox.events.LIGHTBOX_CLOSED, () => {
  console.log("lightbox close");
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

// confirm
const myConfirm = document.querySelector("sevo-confirm");
const confirmOpenButton = document.querySelector("#confirm-open-button");

setTimeout(() => {
  myConfirm.open(myConfirm.animated);
}, 2000);

confirmOpenButton.addEventListener("click", () => {
  myConfirm.open(myConfirm.animated);
});

myConfirm.addEventListener(SevoConfirm.events.CONFIRM_OK, () => {
  console.log(SevoConfirm.events.CONFIRM_OK);
});

myConfirm.addEventListener(SevoConfirm.events.CONFIRM_CANCEL, () => {
  console.log(SevoConfirm.events.CONFIRM_CANCEL);
});

myConfirm.addEventListener(SevoConfirm.events.CONFIRM_OPENED, () => {
  console.log(SevoConfirm.events.CONFIRM_OPENED);
});

myConfirm.addEventListener(SevoConfirm.events.CONFIRM_CLOSED, () => {
  console.log(SevoConfirm.events.CONFIRM_CLOSED);
});

// Filter
const filterContent = document.querySelectorAll("[data-category]");
const filterButtons = document.querySelector("#filter-buttons");

const scf = new SevoContentFilter(filterContent, { all: "Alle" });

filterButtons.appendChild(scf.buttonsContainer);

scf.onComplete = function (target) {
  console.log(target.categories);
  target.filter(
    document.querySelector(`button[data-filter='${target.categories[0]}']`)
  );
};
scf.run();
