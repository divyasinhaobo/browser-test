"use strict";
/*------------------------------------------------------------------------------
   About      : dynamically adds class to the element
   
   Created on : Mon Jul 30 2018
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
var NcStyleClassDirective = /** @class */ (function () {
    function NcStyleClassDirective(element, renderer) {
        this.element = element;
        this.renderer = renderer;
    }
    NcStyleClassDirective.prototype.ngAfterViewInit = function () {
        this.renderer.addClass(this.element.nativeElement, this.ncClass);
    };
    var _a, _b;
    __decorate([
        core_1.Input('ncClass'),
        __metadata("design:type", String)
    ], NcStyleClassDirective.prototype, "ncClass", void 0);
    NcStyleClassDirective = __decorate([
        core_1.Directive({
            selector: '[ncClass]'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _a : Object, typeof (_b = typeof core_1.Renderer2 !== "undefined" && core_1.Renderer2) === "function" ? _b : Object])
    ], NcStyleClassDirective);
    return NcStyleClassDirective;
}());
exports.NcStyleClassDirective = NcStyleClassDirective;
//# sourceMappingURL=nc-style-class.directive.js.map