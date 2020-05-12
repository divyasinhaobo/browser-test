"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Tue Jul 25 2017
   Author     : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
var QUICK_ANIM_MS = 'none'; // (1000/60) + 'ms'
var DomHelper = /** @class */ (function () {
    function DomHelper() {
    }
    DomHelper.addClass = function (className) {
    };
    DomHelper.getTransform = function (xPixel, yPixel, zPixel) {
        return { transform: "translate3d(" + xPixel + "px, " + yPixel + "px, " + zPixel + "px)" };
    };
    DomHelper.getPercentTransform = function (xPercent, yPercent) {
        return { transform: "translate3d(" + xPercent + "%, " + yPercent + "%, 0)" };
    };
    DomHelper.setTransform = function (elem, xPixel, yPixel, zPixel) {
        elem.style.transform = DomHelper.getTransform(xPixel, yPixel, zPixel).transform;
    };
    DomHelper.setPercentTransform = function (elem, xPercent, yPercent) {
        elem.style.transform = DomHelper.getPercentTransform(xPercent, yPercent).transform;
    };
    DomHelper.getQuickAnim = function () {
        return QUICK_ANIM_MS;
    };
    return DomHelper;
}());
exports.DomHelper = DomHelper;
//# sourceMappingURL=dom-helper.js.map