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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var framework_1 = require("framework");
var browser_1 = require("@mubble/browser");
var nail_1 = require("../../nail");
var util_1 = require("@mubble/browser/util");
var ANIM_TRANSITION = 600;
var KEY_ANIM_TRANS = 200;
var EVENT_TIME_TAKEN = 250;
var DialerComponent = /** @class */ (function () {
    function DialerComponent(rc, renderer, ngZone) {
        this.rc = rc;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.eventPropagte = false;
        this.value = new core_1.EventEmitter();
        // window['dialer']    = this
        // user howler for sound if being implemented in mobile 
        //( https://cdnjs.cloudflare.com/ajax/libs/howler/2.1.2/howler.core.min.js)
        // this.sound = new (window as any).Howl({
        //   src     : ['sounds/select.mp3'],
        //   volume  : 0.15
        // });
    }
    DialerComponent.prototype.onHostKeyup = function (event) {
        this.onKeyDown(event);
    };
    DialerComponent.prototype.ngOnInit = function () {
        var slicedItems = this.dialerParams.dialerOptions.slice(0);
        this.viewPortItems = slicedItems;
        this.selectedItem = this.dialerParams.selectedItem || this.viewPortItems[0];
    };
    DialerComponent.prototype.ngAfterViewInit = function () {
        var scrollElem = this.scrollCont.nativeElement, viewPortChildren = scrollElem.children, rect = viewPortChildren[1].getBoundingClientRect(), width = rect.width;
        this.contentHolder.nativeElement.style.height = rect.height + "px";
        this.contentHolder.nativeElement.style.width = width + "px";
        this.contentHolder.nativeElement.style.top = this.dialerParams.highlightPos
            ? "(" + this.dialerParams.highlightPos + " * " + rect.height + ")px"
            : rect.height + "px";
        this.scrollCont.nativeElement.style.top = this.dialerParams.highlightPos
            ? "(" + this.dialerParams.highlightPos + " * " + rect.height + ")px"
            : rect.height + "px";
        this.nail = new nail_1.Nail(this.rc, this.scrollCont.nativeElement, this, this.renderer, { axisX: false, axisY: true });
        this.multiStepVal = new util_1.MultiStepValue(0, rect.height, this.dialerParams.dialerOptions.length, false, true);
    };
    DialerComponent.prototype.ngOnDestroy = function () {
    };
    /*=====================================================================
                                PRIVATE
    =====================================================================*/
    DialerComponent.prototype.onKeyDown = function (event) {
        var scrollElem = this.scrollCont.nativeElement, viewPortChildren = scrollElem.children, rect = viewPortChildren[1].getBoundingClientRect(), lastIndex = this.lastIndex;
        if (event.which === 38) {
            this.multiStepVal.final(rect.height, 0.2);
        }
        else if (event.which === 40) {
            this.multiStepVal.final(-rect.height, 0.2);
        }
        else {
            return;
        }
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.preventDefault();
        var currentIndex = this.multiStepVal.currentIndex;
        if (currentIndex === lastIndex)
            return;
        this.scrollCont.nativeElement.style.transition = KEY_ANIM_TRANS + "ms";
        util_1.DomHelper.setTransform(this.scrollCont.nativeElement, 0, -this.multiStepVal.currentValue, 0);
        this.lastIndex = this.multiStepVal.currentIndex;
        this.selectedItem = this.dialerParams.dialerOptions[this.lastIndex];
        // this.rc.audio.play(this.rc.audio.SELECT)
        if (this.sound)
            this.sound.play();
        if (this.eventPropagte)
            this.value.emit(this.selectedItem);
    };
    /*=====================================================================
                                CALLBACKS
    =====================================================================*/
    DialerComponent.prototype.onPanStart = function () {
        this.scrollCont.nativeElement.style.transition = 'none';
    };
    DialerComponent.prototype.onPanMove = function (event) {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            var scrollElem = _this.scrollCont.nativeElement, viewPortChildren = scrollElem.children, rect = viewPortChildren[1].getBoundingClientRect(), deltaY = event.deltaY, value = _this.multiStepVal.transition(deltaY), lastIndex = _this.lastIndex;
            var newIndex = Math.round(value / rect.height);
            if (lastIndex !== newIndex) {
                if (_this.sound)
                    _this.sound.play();
                _this.lastIndex = newIndex;
            }
            _this.nail.requestAnimate(value);
            _this.rc.isDebug() && _this.rc.debug(_this.rc.getName(_this), "onPanMove " + JSON.stringify({ event: event, lastIndex: _this.lastIndex }));
            _this.selectedItem = _this.dialerParams.dialerOptions[_this.lastIndex];
        });
        return true;
    };
    DialerComponent.prototype.onPanAnimate = function (value) {
        var _this = this;
        this.ngZone.run(function () {
            util_1.DomHelper.setTransform(_this.scrollCont.nativeElement, 0, -value, 0);
        });
    };
    DialerComponent.prototype.onPanEnd = function (event) {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            var deltaY = event.deltaY, scrollElem = _this.scrollCont.nativeElement, viewPortChildren = scrollElem.children, rect = viewPortChildren[1].getBoundingClientRect(), value = _this.multiStepVal.transition(deltaY);
            var currentIndex = _this.multiStepVal.currentIndex;
            _this.multiStepVal.final(deltaY, event.speed, event.quickRatio);
            var latestIndex = _this.multiStepVal.currentIndex;
            var newIndex = Math.round(value / rect.height);
            _this.rc.isDebug() && _this.rc.debug(_this.rc.getName(_this), "onPanEnd " + JSON.stringify({ event: event, lastIndex: _this.lastIndex, newIndex: newIndex, currentIndex: currentIndex, latestIndex: latestIndex }));
            if (currentIndex === latestIndex)
                return;
            _this.scrollCont.nativeElement.style.transition = ANIM_TRANSITION + "ms";
            var totalDisplacement = Math.abs((event.timeTaken < EVENT_TIME_TAKEN ? currentIndex : newIndex) - latestIndex) || 1;
            _this.rc.isDebug() && _this.rc.debug(_this.rc.getName(_this), "totalDisplacement " + JSON.stringify(totalDisplacement));
            var interval = setInterval(function () {
                if (_this.sound)
                    _this.sound.play();
            }, ANIM_TRANSITION / totalDisplacement);
            if (latestIndex >= currentIndex) {
                for (var i = currentIndex; i <= latestIndex; i = i + 0.25) {
                    util_1.DomHelper.setTransform(_this.scrollCont.nativeElement, 0, -rect.height * i, 0);
                }
            }
            else {
                for (var i = latestIndex; i < currentIndex; i = i + 0.25) {
                    util_1.DomHelper.setTransform(_this.scrollCont.nativeElement, 0, rect.height * i, 0);
                }
            }
            setTimeout(function () {
                clearInterval(interval);
            }, ANIM_TRANSITION);
        });
        this.ngZone.run(function () {
            util_1.DomHelper.setTransform(_this.scrollCont.nativeElement, 0, -_this.multiStepVal.currentValue, 0);
            _this.lastIndex = _this.multiStepVal.currentIndex;
            _this.selectedItem = _this.dialerParams.dialerOptions[_this.lastIndex];
            if (_this.eventPropagte)
                _this.value.emit(_this.selectedItem);
        });
    };
    /*=====================================================================
                                UTILS
    =====================================================================*/
    DialerComponent.prototype.getSelectedItem = function () {
        this.value.emit(this.selectedItem);
    };
    DialerComponent.prototype.scrollToElem = function (index) {
        if (index === this.multiStepVal.currentIndex)
            return;
        var scrollElem = this.scrollCont.nativeElement, viewPortChildren = scrollElem.children, rect = viewPortChildren[1].getBoundingClientRect();
        if (index > this.multiStepVal.currentIndex) {
            this.multiStepVal.final(-rect.height, 0.2);
        }
        else {
            this.multiStepVal.final(rect.height, 0.2);
        }
        this.scrollCont.nativeElement.style.transition = KEY_ANIM_TRANS + "ms";
        util_1.DomHelper.setTransform(this.scrollCont.nativeElement, 0, -this.multiStepVal.currentValue, 0);
        this.lastIndex = this.multiStepVal.currentIndex;
        this.selectedItem = this.dialerParams.dialerOptions[this.lastIndex];
        // this.rc.audio.play(this.rc.audio.SELECT)
        if (this.sound)
            this.sound.play();
        if (this.eventPropagte)
            this.value.emit(this.selectedItem);
    };
    var _a, _b, _c, _d, _e, _f, _g, _h;
    __decorate([
        core_1.HostListener('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], DialerComponent.prototype, "onHostKeyup", null);
    __decorate([
        core_1.ViewChild('scrollCont', { static: true }),
        __metadata("design:type", typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _a : Object)
    ], DialerComponent.prototype, "scrollCont", void 0);
    __decorate([
        core_1.ViewChild('contentHolder', { static: true }),
        __metadata("design:type", typeof (_b = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _b : Object)
    ], DialerComponent.prototype, "contentHolder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", typeof (_c = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _c : Object)
    ], DialerComponent.prototype, "parentDiv", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DialerComponent.prototype, "dialerParams", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DialerComponent.prototype, "eventPropagte", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", typeof (_d = typeof browser_1.TrackableScreen !== "undefined" && browser_1.TrackableScreen) === "function" ? _d : Object)
    ], DialerComponent.prototype, "screen", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_e = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _e : Object)
    ], DialerComponent.prototype, "value", void 0);
    DialerComponent = __decorate([
        core_1.Component({
            selector: 'dialer',
            templateUrl: './dialer.component.html',
            styleUrls: ['./dialer.component.scss']
        }),
        __param(0, core_1.Inject('RunContext')),
        __metadata("design:paramtypes", [typeof (_f = typeof framework_1.RunContextApp !== "undefined" && framework_1.RunContextApp) === "function" ? _f : Object, typeof (_g = typeof core_1.Renderer2 !== "undefined" && core_1.Renderer2) === "function" ? _g : Object, typeof (_h = typeof core_1.NgZone !== "undefined" && core_1.NgZone) === "function" ? _h : Object])
    ], DialerComponent);
    return DialerComponent;
}());
exports.DialerComponent = DialerComponent;
//# sourceMappingURL=dialer.component.js.map