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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NcAutoFocusDirective = /** @class */ (function () {
    function NcAutoFocusDirective(element, changeRef) {
        this.element = element;
        this.changeRef = changeRef;
    }
    NcAutoFocusDirective.prototype.ngAfterViewInit = function () {
        this.element.nativeElement.focus();
        this.changeRef.detectChanges();
    };
    var _a, _b;
    NcAutoFocusDirective = __decorate([
        core_1.Directive({
            selector: '[ncAutoFocus]'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _a : Object, typeof (_b = typeof core_1.ChangeDetectorRef !== "undefined" && core_1.ChangeDetectorRef) === "function" ? _b : Object])
    ], NcAutoFocusDirective);
    return NcAutoFocusDirective;
}());
exports.NcAutoFocusDirective = NcAutoFocusDirective;
//# sourceMappingURL=nc-autofocus.directive.js.map