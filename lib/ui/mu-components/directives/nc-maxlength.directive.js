"use strict";
/*------------------------------------------------------------------------------
   About      : supports maxlength attribute for mobile devices
   
   Created on : Mon Mar 05 2018
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
var KEY_UP = 'keyup', PASTE = 'paste', CUT = 'cut', NUMERIC = 'numeric', BACKSPACE = 'Backspace';
var NcMaxLengthDirective = /** @class */ (function () {
    function NcMaxLengthDirective(element, renderer, ngZone) {
        this.element = element;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.maxLength = 0;
        this.updatedValue = new core_1.EventEmitter();
        this.eventHandlers = [];
    }
    NcMaxLengthDirective.prototype.ngAfterViewInit = function () {
        this.maxLength = Number(this.maxLength);
        if (typeof this.maxLength !== 'number')
            return;
        this.eventHandlers.push(this.renderer.listen(this.element.nativeElement, KEY_UP, this.eventHandler.bind(this)), this.renderer.listen(this.element.nativeElement, PASTE, this.clipBoardEventHandler.bind(this)), this.renderer.listen(this.element.nativeElement, CUT, this.clipBoardEventHandler.bind(this)));
    };
    NcMaxLengthDirective.prototype.clipBoardEventHandler = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.ngZone.runOutsideAngular(function () {
                _this.eventHandler(event);
            });
        }, 0);
    };
    NcMaxLengthDirective.prototype.eventHandler = function (event) {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            var element = event.srcElement;
            if (element.inputMode) {
                var validInput = element.inputMode === NUMERIC && element.value.trim().length
                    && !isNaN(element.value);
                if (validInput === false) {
                    var currentValue = element.value, invalidIndex = currentValue.indexOf(event.key);
                    element.value = element.value.substring(0, invalidIndex);
                    return;
                }
            }
            if (event.key === BACKSPACE) {
                _this.emitUpdatedValue(element.value);
                return;
            }
            if (element.value.length > _this.maxLength) {
                element.value = element.value.substring(0, _this.maxLength);
            }
            var scrollHeight = element.scrollHeight, clientHeight = element.clientHeight;
            if (scrollHeight > clientHeight && element.scrollTop !== scrollHeight - clientHeight) {
                element.scrollTop = scrollHeight - clientHeight;
            }
            _this.emitUpdatedValue(element.value);
        });
    };
    NcMaxLengthDirective.prototype.emitUpdatedValue = function (value) {
        var _this = this;
        this.ngZone.run(function () {
            _this.updatedValue.emit(value);
        });
    };
    NcMaxLengthDirective.prototype.ngOnDestroy = function () {
        for (var _i = 0, _a = this.eventHandlers; _i < _a.length; _i++) {
            var eventHandler = _a[_i];
            eventHandler();
        }
        this.eventHandlers = [];
    };
    var _a, _b, _c, _d;
    __decorate([
        core_1.Input('ncMaxLength'),
        __metadata("design:type", Number)
    ], NcMaxLengthDirective.prototype, "maxLength", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_a = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _a : Object)
    ], NcMaxLengthDirective.prototype, "updatedValue", void 0);
    NcMaxLengthDirective = __decorate([
        core_1.Directive({
            selector: '[ncMaxLength]'
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _b : Object, typeof (_c = typeof core_1.Renderer2 !== "undefined" && core_1.Renderer2) === "function" ? _c : Object, typeof (_d = typeof core_1.NgZone !== "undefined" && core_1.NgZone) === "function" ? _d : Object])
    ], NcMaxLengthDirective);
    return NcMaxLengthDirective;
}());
exports.NcMaxLengthDirective = NcMaxLengthDirective;
//# sourceMappingURL=nc-maxlength.directive.js.map