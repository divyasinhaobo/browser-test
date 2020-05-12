"use strict";
/*------------------------------------------------------------------------------
   About      : Directive to provide colorful box with name initial inside of it
   
   Created on : Tue Dec 03 2019
   Author     : Pulkit Chaturvedi
   
   Copyright (c) 2019 Obopay. All rights reserved.
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
var NcFallbackCharDirective = /** @class */ (function () {
    function NcFallbackCharDirective(element) {
        this.element = element;
        this.dynamicColorObj = {};
    }
    NcFallbackCharDirective.prototype.ngAfterViewInit = function () {
        this.createDynamicColor();
        this.initialChar = this.getFirstCharacter(this.data);
        this.setColor(this.initialChar);
    };
    NcFallbackCharDirective.prototype.createDynamicColor = function () {
        var l = '60%';
        var cac = 64, spH = 0, spL = 0;
        for (var i = 1; i <= 26; i++) {
            var h = spH + 10;
            spH += 10;
            for (var j = 0; j <= 26; j++) {
                var s = j ? spL + 3 : 60;
                spL += 3;
                var col = "hsl(" + h + ", " + s + "%, " + l + ")";
                if (j) {
                    this.dynamicColorObj["" + String.fromCharCode(cac + i) + String.fromCharCode(cac + j)] = col;
                }
                else {
                    this.dynamicColorObj[String.fromCharCode(cac + i)] = col;
                }
            }
            spL = 0;
        }
    };
    NcFallbackCharDirective.prototype.getFirstCharacter = function (str) {
        var strArr = str.split(' ');
        var initials;
        if (this.needOneChar) {
            return initials = strArr[0].charAt(0).toUpperCase();
        }
        if (strArr.length > 1) {
            initials = (strArr[0].charAt(0) + strArr[1].charAt(0)).toUpperCase();
        }
        else {
            initials = strArr[0].charAt(0).toUpperCase();
        }
        return initials;
    };
    NcFallbackCharDirective.prototype.setColor = function (key) {
        this.dynamicColorObj[key];
        this.element.nativeElement.innerHTML = this.initialChar;
        this.element.nativeElement.style.background = this.dynamicColorObj[key];
    };
    var _a;
    __decorate([
        core_1.Input('ncFallbackChar'),
        __metadata("design:type", String)
    ], NcFallbackCharDirective.prototype, "data", void 0);
    __decorate([
        core_1.Input('needOneChar'),
        __metadata("design:type", Boolean)
    ], NcFallbackCharDirective.prototype, "needOneChar", void 0);
    NcFallbackCharDirective = __decorate([
        core_1.Directive({
            selector: '[ncFallbackChar]'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _a : Object])
    ], NcFallbackCharDirective);
    return NcFallbackCharDirective;
}());
exports.NcFallbackCharDirective = NcFallbackCharDirective;
//# sourceMappingURL=nc-fallback-char.directive.js.map