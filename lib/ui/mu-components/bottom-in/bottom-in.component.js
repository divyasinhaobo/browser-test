"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var router_1 = require("@angular/router");
var nail_1 = require("../../nail");
var router_2 = require("../../router");
var util_1 = require("../../../util");
var browser_1 = require("@mubble/browser");
var animations_1 = require("@angular/animations");
exports.STATE = { HALF: 'HALF', FULL: 'FULL' };
var ROUTE_ANIM_MS = 400, PAN_ANIM_MS = '300ms', QUICK_ANIM_MS = util_1.DomHelper.getQuickAnim(), COMMIT_RATIO = 1 / 3, FAST_COMMIT_RATIO = COMMIT_RATIO / 2, QUICK_SPEED = .3;
var BottomInComponent = /** @class */ (function (_super) {
    __extends(BottomInComponent, _super);
    function BottomInComponent(rc, router, route, componentFactoryResolver, renderer, ref) {
        var _this = _super.call(this, rc, router, componentFactoryResolver, route) || this;
        _this.renderer = renderer;
        _this.ref = ref;
        _this.__routeAnimation = null;
        _this.animElem = true;
        _this.title = '';
        _this.state = exports.STATE.HALF;
        _this.allowFullPage = true;
        _this.routeEndProcessed = false;
        rc.setupLogger(_this, 'BottomIn', browser_1.LOG_LEVEL.DEBUG);
        _this.rc.isDebug() && _this.rc.debug(_this.rc.getName(_this), 'constructor');
        if (rc.getGlobalLogLevel() === browser_1.LOG_LEVEL.DEBUG) {
            window['bi'] = _this;
        }
        return _this;
    }
    // @HostBinding('style.z-index')   zIndex   = 2000
    BottomInComponent.prototype.onHostClick = function () {
        if (this.state === exports.STATE.HALF) {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Dismissing bottom-in due to host click');
            this.animateClose();
        }
    };
    BottomInComponent.prototype.onRouteAnimationStart = function (event) {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onRouteAnimation-start', event);
        // console.log(event)
    };
    BottomInComponent.prototype.onRouteAnimationDone = function (event) {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onRouteAnimation-end', event);
        // console.log(event)
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onRouteAnimation-end', event);
        if (this.childRequestedClose && this.injectedComponent.closeFromParent) {
            if (this.routeEndProcessed)
                return;
            this.routeEndProcessed = true;
            this.injectedComponent.closeFromParent();
        }
        else if (this.backPressed && this.injectedComponent.onBackPressed) {
            if (this.routeEndProcessed)
                return;
            this.routeEndProcessed = true;
            this.injectedComponent.onBackPressed();
        }
    };
    BottomInComponent.prototype.onRouterInit = function (params) {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onRouterInit');
        _super.prototype.onRouterInit.call(this, params, this.injectAt, false);
        this.title = this.injectedComponent.getTitle();
        var halfHeight = this.injectedComponent.getHalfHeight();
        if (this.injectedComponent.getDefaultState) {
            this.state = this.injectedComponent.getDefaultState();
        }
        if (this.state === exports.STATE.FULL) {
            halfHeight = document.body.clientHeight;
        }
        else if (halfHeight) {
            if (halfHeight > document.body.clientHeight) {
                this.rc.isError() && this.rc.error(this.rc.getName(this), 'Half height passed is incorrect', { halfHeight: halfHeight, clientHeight: document.body.clientHeight });
                halfHeight = 0.8 * document.body.clientHeight;
            }
            this.top = document.body.clientHeight - halfHeight;
        }
        else {
            this.allowFullPage = false;
        }
    };
    BottomInComponent.prototype.ngAfterViewInit = function () {
        // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'ngAfterViewInit')
        this.panYMax = document.body.clientHeight;
        var $compCont = this.compContainer.nativeElement, compHeight = $compCont.clientHeight, headerHeight = this.header.nativeElement.getBoundingClientRect().height;
        if (this.allowFullPage) {
            this.panYMin = 0;
            $compCont.style.height = document.body.clientHeight - headerHeight;
        }
        else {
            this.top = document.body.clientHeight - (compHeight + headerHeight);
            this.panYMin = this.top;
        }
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'ngAfterViewInit: Component container', {
            clientHeight: document.body.clientHeight,
            compHeight: compHeight, headerHeight: headerHeight,
            top: this.top
        });
        this.main.nativeElement.style.transform = util_1.DomHelper.getTransform(0, this.top, 0).transform;
        this.nail = new nail_1.Nail(this.rc, this.main.nativeElement, this, this.renderer, { axisX: false, axisY: true });
        this.ref.detectChanges();
    };
    BottomInComponent.prototype.onPanStart = function () {
        this.startTop = this.compContainer.nativeElement.scrollTop;
        // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onPanStart', {
        //   panY: this.panY, state: this.state})
    };
    BottomInComponent.prototype.onPanMove = function (event) {
        var deltaY = event.deltaY;
        if (this.compContainer.nativeElement.scrollTop) {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'cancelling panMove', { scrollTop: this.compContainer.nativeElement.scrollTop });
            return false;
        }
        if (deltaY > 0)
            deltaY -= this.startTop;
        var y = (this.state === exports.STATE.HALF ? this.top : this.panYMin) + deltaY;
        if (y < this.panYMin) {
            y = this.panYMin;
        }
        else if (y > this.panYMax) {
            y = this.panYMax;
        }
        // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onPanMove', {
        //   type: event.type, deltaY, y, panY: this.panY, state: this.state
        // })
        var needAnimate = this.panY !== y;
        if (needAnimate)
            this.nail.requestAnimate(y);
        return needAnimate;
    };
    BottomInComponent.prototype.onPanAnimate = function (y) {
        this.animateChange(y, false);
    };
    BottomInComponent.prototype.onPanEnd = function (event) {
        // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onPanEnd', {
        //   type: event.type, panY: this.panY, top: this.top, speed: event.speed
        // })
        if (this.state === exports.STATE.HALF) {
            if (this.panY > this.top) {
                this.animateClose();
            }
            else if (this.panY < this.top) {
                this.onFull(true);
            }
            else {
                this.onHalf(true);
            }
        }
        else { // full
            if (this.panY > this.panYMin) {
                this.animateClose();
            }
            else {
                this.onFull(true);
            }
        }
    };
    BottomInComponent.prototype.onClick = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    BottomInComponent.prototype.ngOnDestroy = function () {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'ngOnDestroy');
        _super.prototype.ngOnDestroy.call(this);
        if (this.nail)
            this.nail.destroy();
    };
    BottomInComponent.prototype.onHalf = function (runAnimation) {
        this.state = exports.STATE.HALF;
        this.animateChange(this.top, runAnimation);
    };
    BottomInComponent.prototype.onFull = function (runAnimation) {
        this.state = exports.STATE.FULL;
        this.animateChange(this.panYMin, runAnimation);
    };
    BottomInComponent.prototype.animateChange = function (y, runAnimation) {
        if (this.panY !== y) {
            this.panY = y;
            var animValue = runAnimation ? PAN_ANIM_MS : QUICK_ANIM_MS;
            if (this.animValue !== animValue) {
                this.animValue = animValue;
                this.main.nativeElement.style.transition = animValue;
            }
            util_1.DomHelper.setTransform(this.main.nativeElement, 0, y, 0);
        }
    };
    BottomInComponent.prototype.animateClose = function () {
        this.injectedComponent.closeFromParent();
        this.router.goBack();
    };
    BottomInComponent.prototype.onBackPressed = function () {
        this.backPressed = true;
    };
    var _a, _b, _c, _d, _e, _f, _g, _h;
    __decorate([
        core_1.HostBinding('@routeAnimation'),
        __metadata("design:type", Object)
    ], BottomInComponent.prototype, "__routeAnimation", void 0);
    __decorate([
        core_1.HostBinding('class.glb-animated-element'),
        __metadata("design:type", Object)
    ], BottomInComponent.prototype, "animElem", void 0);
    __decorate([
        core_1.HostListener('click', ['$event.target']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BottomInComponent.prototype, "onHostClick", null);
    __decorate([
        core_1.HostListener('@routeAnimation.start', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], BottomInComponent.prototype, "onRouteAnimationStart", null);
    __decorate([
        core_1.HostListener('@routeAnimation.done', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], BottomInComponent.prototype, "onRouteAnimationDone", null);
    __decorate([
        core_1.ViewChild('main', { static: true }),
        __metadata("design:type", typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _a : Object)
    ], BottomInComponent.prototype, "main", void 0);
    __decorate([
        core_1.ViewChild('header', { static: true }),
        __metadata("design:type", typeof (_b = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _b : Object)
    ], BottomInComponent.prototype, "header", void 0);
    __decorate([
        core_1.ViewChild('compContainer', { static: true }),
        __metadata("design:type", typeof (_c = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _c : Object)
    ], BottomInComponent.prototype, "compContainer", void 0);
    __decorate([
        core_1.ViewChild('injectAt', { read: core_1.ViewContainerRef, static: true }),
        __metadata("design:type", Object)
    ], BottomInComponent.prototype, "injectAt", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], BottomInComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], BottomInComponent.prototype, "state", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], BottomInComponent.prototype, "allowFullPage", void 0);
    BottomInComponent = __decorate([
        core_1.Component({
            selector: 'bottom-in',
            templateUrl: './bottom-in.component.html',
            styleUrls: ['./bottom-in.component.scss'],
            animations: [
                animations_1.trigger('routeAnimation', [
                    animations_1.transition(':enter', [
                        animations_1.group([
                            animations_1.query(':self', [
                                animations_1.style({
                                    opacity: 0
                                }),
                                animations_1.animate(ROUTE_ANIM_MS, animations_1.style({
                                    opacity: 1
                                }))
                            ]),
                            animations_1.query('div.main', [
                                animations_1.style(util_1.DomHelper.getPercentTransform(0, 100)),
                                animations_1.animate(ROUTE_ANIM_MS, animations_1.style('*'))
                            ])
                        ])
                    ]),
                    animations_1.transition(':leave', [
                        animations_1.group([
                            animations_1.animate(ROUTE_ANIM_MS, animations_1.style({
                                opacity: 0
                            })),
                            animations_1.query('div.main', [
                                animations_1.animate(ROUTE_ANIM_MS, animations_1.style({
                                    transform: 'translate3d(0, 100%, 0)'
                                }))
                            ])
                        ])
                    ])
                ])
            ]
        }),
        __param(0, core_1.Inject('RunContext')),
        __metadata("design:paramtypes", [typeof (_d = typeof browser_1.RunContextBrowser !== "undefined" && browser_1.RunContextBrowser) === "function" ? _d : Object, router_2.UiRouter, typeof (_e = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" ? _e : Object, typeof (_f = typeof core_1.ComponentFactoryResolver !== "undefined" && core_1.ComponentFactoryResolver) === "function" ? _f : Object, typeof (_g = typeof core_1.Renderer2 !== "undefined" && core_1.Renderer2) === "function" ? _g : Object, typeof (_h = typeof core_1.ChangeDetectorRef !== "undefined" && core_1.ChangeDetectorRef) === "function" ? _h : Object])
    ], BottomInComponent);
    return BottomInComponent;
}(browser_1.InjectionParentBase));
exports.BottomInComponent = BottomInComponent;
//# sourceMappingURL=bottom-in.component.js.map