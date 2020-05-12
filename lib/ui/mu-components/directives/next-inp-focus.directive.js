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
var rc_browser_1 = require("../../../rc-browser");
var NextInpFocusDirective = /** @class */ (function () {
    function NextInpFocusDirective(rc) {
        this.rc = rc;
        this.onSubmit = new core_1.EventEmitter();
    }
    NextInpFocusDirective.prototype.onHostSubmit = function (event) {
        this.onEnter(event);
    };
    NextInpFocusDirective.prototype.onEnter = function (event) {
        if (this.nextInpFocusElem) {
            this.nextInpFocusElem.focus();
        }
        else {
            this.onSubmit.emit(event);
        }
    };
    var _a;
    __decorate([
        core_1.HostListener('keydown.enter', ['$event.target']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NextInpFocusDirective.prototype, "onHostSubmit", null);
    __decorate([
        core_1.Input('nextInpFocus'),
        __metadata("design:type", HTMLElement)
    ], NextInpFocusDirective.prototype, "nextInpFocusElem", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_a = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _a : Object)
    ], NextInpFocusDirective.prototype, "onSubmit", void 0);
    NextInpFocusDirective = __decorate([
        core_1.Directive({
            selector: '[nextInpFocus]'
        }),
        __param(0, core_1.Inject('RunContext')),
        __metadata("design:paramtypes", [rc_browser_1.RunContextBrowser])
    ], NextInpFocusDirective);
    return NextInpFocusDirective;
}());
exports.NextInpFocusDirective = NextInpFocusDirective;
//# sourceMappingURL=next-inp-focus.directive.js.map