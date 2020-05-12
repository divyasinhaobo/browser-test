"use strict";
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
var LongPressDirective = /** @class */ (function () {
    function LongPressDirective() {
        this.timeoutId = null;
        this.intervalId = null;
        this.onLongPress = new core_1.EventEmitter();
        this.onLongPressing = new core_1.EventEmitter();
        this.isTouching = new core_1.EventEmitter();
        this.timeout = 1000;
    }
    Object.defineProperty(LongPressDirective.prototype, "press", {
        get: function () {
            return this.isPressing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LongPressDirective.prototype, "longPress", {
        get: function () {
            return this.isLongPressing;
        },
        enumerable: true,
        configurable: true
    });
    LongPressDirective.prototype.onMouseDown = function (event) {
        var _this = this;
        this.isPressing = true;
        this.isTouching.emit(true);
        this.isLongPressing = false;
        this.timeoutId = window.setTimeout(function () {
            _this.isLongPressing = true;
            _this.onLongPress.emit(event);
            _this.intervalId = window.setInterval(function () {
                _this.onLongPressing.emit(event);
            }, 30);
        }, this.timeout);
    };
    LongPressDirective.prototype.onMouseLeave = function () {
        this.endPress();
    };
    LongPressDirective.prototype.endPress = function () {
        if (this.timeoutId !== null)
            clearTimeout(this.timeoutId);
        if (this.intervalId !== null)
            clearInterval(this.intervalId);
        this.isLongPressing = false;
        this.isPressing = false;
        this.isTouching.emit(false);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], LongPressDirective.prototype, "onLongPress", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], LongPressDirective.prototype, "onLongPressing", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], LongPressDirective.prototype, "isTouching", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], LongPressDirective.prototype, "timeout", void 0);
    __decorate([
        core_1.HostBinding('class.press'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], LongPressDirective.prototype, "press", null);
    __decorate([
        core_1.HostBinding('class.long-press'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], LongPressDirective.prototype, "longPress", null);
    __decorate([
        core_1.HostListener('touchstart', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], LongPressDirective.prototype, "onMouseDown", null);
    __decorate([
        core_1.HostListener('touchend', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LongPressDirective.prototype, "onMouseLeave", null);
    LongPressDirective = __decorate([
        core_1.Directive({
            selector: '[long-press]'
        })
    ], LongPressDirective);
    return LongPressDirective;
}());
exports.LongPressDirective = LongPressDirective;
//# sourceMappingURL=longpress.directive.js.map