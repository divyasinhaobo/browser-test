"use strict";
/*------------------------------------------------------------------------------
   About      : <Autofocuses the input element on page load every time>
   
   Created on : Thu Aug 10 2017
   Author     : Aditya Baddur
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var debounce_1 = require("lodash/debounce");
var KeyboardDirective = /** @class */ (function () {
    function KeyboardDirective(rc, element, renderer) {
        this.rc = rc;
        this.element = element;
        this.renderer = renderer;
    }
    KeyboardDirective.prototype.ngAfterViewInit = function () {
        if (!this.parentDiv)
            return;
        if (this.isHeghtAuto === undefined) {
            this.isHeghtAuto = !this.parentDiv.style.height.length;
        }
        this.renderer.addClass(this.element.nativeElement, 'mui-event-adjust-pan-screen');
        this.renderer.listen(this.element.nativeElement, 'mui-event-adjust-pan-screen', this.onCustomEvent.bind(this));
        this.renderer.listen(this.element.nativeElement, 'focus', this.onCustomEvent.bind(this));
        this.renderer.listen(this.element.nativeElement, 'blur', this.onBlur.bind(this));
        if (this.rc.bridge.isRunningInMWeb()) {
            this.handleKeyBoardEvents();
            window.addEventListener('resize', debounce_1.default(this.handleKeyBoardEvents.bind(this), 300));
        }
    };
    KeyboardDirective.prototype.handleKeyBoardEvents = function () {
        var bodyHeight = document.body.getBoundingClientRect().height;
        if (!this.originalBodyHeight)
            this.originalBodyHeight = bodyHeight;
        var keyboardHeight = this.originalBodyHeight - bodyHeight;
        this.rc.bridge.currKeyboardHt = -keyboardHeight;
        this.onCustomEvent();
    };
    KeyboardDirective.prototype.onBlur = function () {
        if (this.rc.bridge.isRunningInBrowser() && !this.rc.bridge.isRunningInMWeb())
            return;
        if (this.isHeghtAuto) {
            this.renderer.removeStyle(this.parentDiv, 'height');
        }
        else {
            this.parentDiv.style.height = this.originalParentHeight + 'px';
        }
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), "onBlur original Height " + this.originalParentHeight);
        if (this.rc.bridge.isRunningInMWeb()) {
            window.scrollTo(0, 0);
        }
    };
    KeyboardDirective.prototype.onCustomEvent = function () {
        if (this.rc.bridge.isRunningInBrowser() && !this.rc.bridge.isRunningInMWeb())
            return;
        var keyboardHeight = this.rc.bridge.currKeyboardHt, parentDiv = this.parentDiv, parentDivRect = parentDiv.getBoundingClientRect();
        if (document.activeElement !== this.element.nativeElement)
            return;
        if (keyboardHeight < 0) {
            this.originalParentHeight = this.parentDiv.getBoundingClientRect().height;
            parentDiv.style.height = (parentDivRect.height - keyboardHeight) + 'px';
            var scrollOptions = {
                behaviour: 'smooth',
                block: 'center',
                inline: 'start'
            };
            this.element.nativeElement.scrollIntoView(scrollOptions);
            if (this.rc.bridge.isRunningInMWeb()) {
                window.scrollTo(0, 0);
            }
        }
        else {
            this.onBlur();
        }
    };
    KeyboardDirective.prototype.ngOnDestroy = function () {
        this.renderer.removeClass(this.element.nativeElement, 'mui-event-adjust-pan-screen');
    };
    var _a, _b;
    __decorate([
        core_1.Input('keyboard'),
        __metadata("design:type", HTMLElement)
    ], KeyboardDirective.prototype, "parentDiv", void 0);
    KeyboardDirective = __decorate([
        core_1.Directive({
            selector: '[keyboard]'
        }),
        __param(0, core_1.Inject('RunContext')),
        __metadata("design:paramtypes", [Object, typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _a : Object, typeof (_b = typeof core_1.Renderer2 !== "undefined" && core_1.Renderer2) === "function" ? _b : Object])
    ], KeyboardDirective);
    return KeyboardDirective;
}());
exports.KeyboardDirective = KeyboardDirective;
//# sourceMappingURL=keyboard.directive.js.map