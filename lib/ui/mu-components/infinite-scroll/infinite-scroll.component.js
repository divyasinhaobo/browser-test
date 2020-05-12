"use strict";
/*------------------------------------------------------------------------------

   About      : Infinite scroll
   
   Created on : Mon Jul 23 2018
   Author     : Aditya Baddur
   
   Copyright (c) 2018 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dom_helper_1 = require("@mubble/browser/util/dom-helper");
var SCROLL_EVENT = 'scroll';
var InfiniteScrollComponent = /** @class */ (function () {
    function InfiniteScrollComponent(element, ngZone, renderer) {
        this.element = element;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.items = []; //Items that have to be loaded into html in chunks
        this.upperBufferCount = 50; //min no. of elements that should be loaded at the top before we start removing items
        this.lowerBufferCount = 10; //min no. of elements that should be loaded at the bottom
        this.listEnd = new core_1.EventEmitter(); // list ended event to the parent 
        this.activeElement = new core_1.EventEmitter(); // active element event to the parent
        this.viewPortItems = []; // these are the items that are loaded in html
        //the indices which slices the main items list
        this.previousStartIdx = 0;
        this.previousEndIdx = -1;
        this.itemsHeight = {}; //caching each divs height to translate the scrollable div
        this.translateY = 0;
        this.lastScrolledTop = 0;
        this.currActiveElemIndex = 0;
        this.lastActiveElemIndex = -1;
    }
    InfiniteScrollComponent.prototype.ngOnInit = function () {
        this.viewPortItems = this.items.slice(this.previousStartIdx, this.lowerBufferCount);
        this.scrollHandler = this.renderer.listen(this.element.nativeElement, SCROLL_EVENT, this.refreshList.bind(this));
    };
    InfiniteScrollComponent.prototype.ngOnChanges = function () {
        this.refreshList();
    };
    InfiniteScrollComponent.prototype.ngAfterViewInit = function () {
        this.setInitHolderHeight();
    };
    InfiniteScrollComponent.prototype.ngOnDestroy = function () {
        if (this.scrollHandler) {
            this.scrollHandler();
        }
    };
    /*=====================================================================
                                PRIVATE METHODS
    =====================================================================*/
    InfiniteScrollComponent.prototype.setInitHolderHeight = function () {
        var viewPortChildren = this.scrollCont.nativeElement.children, holderHeight = this.calculateHeight() / viewPortChildren.length * this.viewPortItems.length;
        this.renderer.setStyle(this.contentHolder.nativeElement, 'height', holderHeight + "px");
    };
    InfiniteScrollComponent.prototype.calculateHeight = function () {
        var viewPortChildren = this.scrollCont.nativeElement.children;
        var totalHeight = 0;
        for (var i = 0; i < viewPortChildren.length; i++) {
            var height = viewPortChildren[i].getBoundingClientRect().height;
            totalHeight += height;
        }
        return Math.ceil(totalHeight);
    };
    InfiniteScrollComponent.prototype.cacheViewedItemsHeight = function () {
        var viewPortChildren = this.scrollCont.nativeElement.children;
        var i = this.previousStartIdx;
        for (var _i = 0, viewPortChildren_1 = viewPortChildren; _i < viewPortChildren_1.length; _i++) {
            var child = viewPortChildren_1[_i];
            var height = child.getBoundingClientRect().height;
            this.itemsHeight[i] = height;
            i++;
        }
    };
    InfiniteScrollComponent.prototype.updateViewPortItems = function () {
        var _this = this;
        var viewPortChildren = this.scrollCont.nativeElement.children, viewPortItemsHeight = this.calculateHeight(), averageHeight = Math.ceil(viewPortItemsHeight / viewPortChildren.length), scrollTop = this.element.nativeElement.scrollTop, containerHeight = this.element.nativeElement.getBoundingClientRect().height;
        this.cacheViewedItemsHeight();
        var start = this.previousStartIdx, end = this.previousEndIdx;
        var elementsScrolled = Math.ceil(scrollTop / averageHeight), elementsVisible = Math.ceil(containerHeight / averageHeight);
        start = elementsScrolled - this.upperBufferCount + elementsVisible;
        end = elementsScrolled + elementsVisible + this.lowerBufferCount;
        start = Math.max(0, start);
        end = Math.min(this.items.length, end >= 0 ? end : Infinity);
        var height = 0;
        if (start > this.previousStartIdx) {
            //scrolling down
            for (var i = this.previousStartIdx; i < start; i++) {
                height += this.itemsHeight[i] || averageHeight;
            }
            this.translateY += height;
        }
        else if (start < this.previousStartIdx) {
            //scrolling up
            for (var i = start; i < this.previousStartIdx; i++) {
                height += this.itemsHeight[i] || averageHeight;
            }
            this.translateY -= height;
        }
        var currentHolderHeight = Math.ceil(viewPortItemsHeight + this.translateY);
        var holderHeight = Math.ceil((averageHeight * (this.items.length - end) + currentHolderHeight));
        this.renderer.setStyle(this.contentHolder.nativeElement, 'height', holderHeight + "px");
        dom_helper_1.DomHelper.setTransform(this.scrollCont.nativeElement, 0, this.translateY, 0);
        if (start !== this.previousStartIdx || end !== this.previousEndIdx) {
            this.ngZone.run(function () {
                _this.previousStartIdx = start;
                _this.previousEndIdx = end;
                _this.viewPortItems = _this.items.slice(start, end);
                if (_this.previousEndIdx === _this.items.length)
                    _this.listEnd.emit(_this.items.length);
            });
        }
    };
    InfiniteScrollComponent.prototype.scrollTo = function (index, highlight) {
        if (highlight === void 0) { highlight = false; }
        var totalHeight = 0;
        for (var i = 0; i < index; i++) {
            totalHeight += this.itemsHeight[i];
        }
        this.element.nativeElement.scrollTop = totalHeight;
        if (highlight) {
            //TODO: add bg color and delay
        }
        this.refreshList();
    };
    InfiniteScrollComponent.prototype.isElementInViewPort = function (element) {
        var parentElem = this.element.nativeElement, viewPortTop = parentElem.scrollTop, viewPortBottom = viewPortTop + parentElem.clientHeight, elemTop = element.offsetTop + (0.1 * element.clientHeight), elemBottom = element.offsetTop + (0.9 * element.clientHeight);
        return (elemBottom <= viewPortBottom) && (elemTop >= viewPortTop);
    };
    /*
      if scrolling down, the first visible element from top is currentActive element else
      the last visible element is currentActive element
    */
    InfiniteScrollComponent.prototype.updateCurrActiveElemIdx = function () {
        var parentElem = this.element.nativeElement, viewPortElements = parentElem.children[1].children, scrolledDown = parentElem.scrollTop > this.lastScrolledTop;
        for (var index = 0; index < viewPortElements.length; index++) {
            var elementVisible = this.isElementInViewPort(viewPortElements[index]), anchorId = this.viewPortItems[index].anchorId || null;
            if (elementVisible && anchorId) {
                this.currActiveElemIndex = this.previousStartIdx + index;
                if (scrolledDown)
                    break;
            }
        }
        this.lastScrolledTop = parentElem.scrollTop;
    };
    /*=====================================================================
                                      UTILS
    =====================================================================*/
    InfiniteScrollComponent.prototype.scrollToTop = function () {
        this.element.nativeElement.scrollTop = 0;
        this.refreshList();
    };
    InfiniteScrollComponent.prototype.scrollToItem = function (index, highlight) {
        var _this = this;
        if (highlight === void 0) { highlight = false; }
        if (this.itemsHeight[index]) {
            this.scrollTo(index, highlight);
        }
        else {
            if (index < this.items.length) {
                this.viewPortItems = this.items.slice(0, index + this.lowerBufferCount);
                this.refreshList();
                setTimeout(function () {
                    _this.scrollTo(index, highlight);
                }, 0);
            }
        }
    };
    InfiniteScrollComponent.prototype.getScrollableElement = function () {
        return this.element;
    };
    // getSkippedElementsId() : string[] {
    //   const skippedElementsId = []
    //   if (this.lastActiveElemIndex > this.currActiveElemIndex) {
    //     for (let i = this.currActiveElemIndex; i < this.lastActiveElemIndex; i++) {
    //       const anchorId = this.items[i].anchorId || null
    //       if (anchorId) skippedElementsId.push(anchorId)
    //     }
    //   } else if (this.lastActiveElemIndex < this.currActiveElemIndex) {
    //     for (let i = this.lastActiveElemIndex; i < this.currActiveElemIndex; i++) {
    //       const anchorId = this.items[i].anchorId || null
    //       if (anchorId) skippedElementsId.push(anchorId)
    //     }
    //   }
    //   return skippedElementsId
    // }
    InfiniteScrollComponent.prototype.getViewedElementsId = function () {
        var parentElem = this.element.nativeElement, viewPortElements = parentElem.children[1].children, viewedElementsIds = [];
        this.lastActiveElemIndex = this.currActiveElemIndex;
        for (var index = 0; index < viewPortElements.length; index++) {
            var elementVisible = this.isElementInViewPort(viewPortElements[index]), anchorId = this.viewPortItems[index].anchorId || null;
            if (elementVisible && anchorId) {
                viewedElementsIds.push(anchorId);
            }
        }
        this.updateCurrActiveElemIdx();
        return viewedElementsIds;
    };
    InfiniteScrollComponent.prototype.getActiveElementId = function (firstElem) {
        if (firstElem === void 0) { firstElem = false; }
        var parentElem = this.element.nativeElement, viewPortElements = parentElem.children[1].children;
        var activeElementId;
        for (var index = 0; index < viewPortElements.length; index++) {
            var elementVisible = this.isElementInViewPort(viewPortElements[index]), anchorId = this.viewPortItems[index].anchorId || null;
            if (elementVisible && anchorId) {
                activeElementId = anchorId;
            }
        }
        return activeElementId;
    };
    /*=====================================================================
                                HTML FUNCTIONS
    =====================================================================*/
    InfiniteScrollComponent.prototype.refreshList = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            requestAnimationFrame(function () {
                _this.updateViewPortItems();
            });
        });
    };
    var _a, _b, _c, _d, _e, _f, _g;
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], InfiniteScrollComponent.prototype, "items", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], InfiniteScrollComponent.prototype, "upperBufferCount", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], InfiniteScrollComponent.prototype, "lowerBufferCount", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_a = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _a : Object)
    ], InfiniteScrollComponent.prototype, "listEnd", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_b = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _b : Object)
    ], InfiniteScrollComponent.prototype, "activeElement", void 0);
    __decorate([
        core_1.ViewChild('scrollCont', { static: true }),
        __metadata("design:type", typeof (_c = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _c : Object)
    ], InfiniteScrollComponent.prototype, "scrollCont", void 0);
    __decorate([
        core_1.ViewChild('contentHolder', { static: true }),
        __metadata("design:type", typeof (_d = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _d : Object)
    ], InfiniteScrollComponent.prototype, "contentHolder", void 0);
    InfiniteScrollComponent = __decorate([
        core_1.Component({
            selector: 'infinite-scroll',
            templateUrl: './infinite-scroll.component.html',
            styleUrls: ['./infinite-scroll.component.scss']
        }),
        __metadata("design:paramtypes", [typeof (_e = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _e : Object, typeof (_f = typeof core_1.NgZone !== "undefined" && core_1.NgZone) === "function" ? _f : Object, typeof (_g = typeof core_1.Renderer2 !== "undefined" && core_1.Renderer2) === "function" ? _g : Object])
    ], InfiniteScrollComponent);
    return InfiniteScrollComponent;
}());
exports.InfiniteScrollComponent = InfiniteScrollComponent;
//# sourceMappingURL=infinite-scroll.component.js.map