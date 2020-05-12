"use strict";
/*------------------------------------------------------------------------------
   About      : Assign width and margin to elements in a single row
   
   Created on : Mon Nov 11 2019
   Author     : Divya Sinha
   
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
var AdjustElementsDirective = /** @class */ (function () {
    function AdjustElementsDirective(element) {
        this.element = element;
        this.displayCount = 1; //number of elements to be displayed in a single row
        this.webMode = false; //if implemented in web mode, only then will this adjust otherwise it will take 100% width
    }
    AdjustElementsDirective.prototype.ngAfterViewInit = function () {
        var webModeCss = this.calcWidth();
        if ((this.index + 1) % this.displayCount !== 0) {
            this.element.nativeElement.style.width = webModeCss.width;
            this.element.nativeElement.style.marginRight = webModeCss.marginRight;
            this.element.nativeElement.style.maxWidth = webModeCss.maxWidth;
        }
        else {
            this.element.nativeElement.style.width = webModeCss.width;
            this.element.nativeElement.style.maxWidth = webModeCss.maxWidth;
        }
    };
    AdjustElementsDirective.prototype.calcWidth = function () {
        var webModeCss = {};
        if (!this.webMode) {
            webModeCss.width = '100%';
            return webModeCss;
        }
        switch (this.displayCount) {
            /* If the situation says that the parent wants to display 1 or 2 elements per row, we
            are assigning it manually. Otherwise we are iterating the 100% width in the for loop. */
            case 1:
                webModeCss.width = '60%';
                webModeCss.maxWidth = '400px';
                break;
            case 2:
                webModeCss.width = '45%';
                webModeCss.marginRight = '10%';
                webModeCss.maxWidth = '400px';
                break;
            default:
                var width = void 0, marginRight = void 0, index = void 0;
                /* Considering the full width to be 100%, we are looping from 99 to get the maximum
                width and minimum margin. The total width of the element container should be a
                multiple of display count where as the total margin width should be a multiple of
                (display count - 1).

                This is because we are not providing the margin to the last container but giving a
                margin right to other divs. If the total width of element container is x% then
                total margin width becomes (100 - x)%. For eg. say our display count is 4.

                For display count 4, there are 4 elements and 3 empty spaces in one row. Largest
                number closest to 100 is assigned to total width where are largest number closest
                to 0 is assigned to total margin. This helps us show the content in the maximum
                space and give minimum possible space between them.

                Here we are not starting the loop from 100 because if the display count is a factor
                of 100 then it won't provide any margin hence making it difficult to distinguish
                between two adjacent divs.

                For display count = 4, we calculate from the loop that maximum width of each element
                is 19% and margin between any two consecutive elements will be 8%. Hence, (4 * 19) +
                (3 * 8) = 76 + 24 = 100% width is covered.
                
                While checking for margin, we are keeping one more check that margin to be given on
                right should be more than the total elements to be displayed in single row.*/
                for (index = 99; index > 1; index--) {
                    if ((index % this.displayCount === 0) &&
                        (((100 - index) % (this.displayCount - 1) === 0) &&
                            ((100 - index) / (this.displayCount - 1) > this.displayCount))) {
                        width = (index / this.displayCount).toString().concat('%');
                        marginRight = ((100 - index) / (this.displayCount - 1)).toString().concat('%');
                        break;
                    }
                }
                webModeCss.width = width;
                webModeCss.marginRight = marginRight;
                break;
        }
        return webModeCss;
    };
    var _a;
    __decorate([
        core_1.Input('displayInSingleRow'),
        __metadata("design:type", Number)
    ], AdjustElementsDirective.prototype, "displayCount", void 0);
    __decorate([
        core_1.Input('elementIndex'),
        __metadata("design:type", Number)
    ], AdjustElementsDirective.prototype, "index", void 0);
    __decorate([
        core_1.Input('webMode'),
        __metadata("design:type", Boolean)
    ], AdjustElementsDirective.prototype, "webMode", void 0);
    AdjustElementsDirective = __decorate([
        core_1.Directive({
            selector: '[adjustElements]'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _a : Object])
    ], AdjustElementsDirective);
    return AdjustElementsDirective;
}());
exports.AdjustElementsDirective = AdjustElementsDirective;
//# sourceMappingURL=adjust-elements.directive.js.map