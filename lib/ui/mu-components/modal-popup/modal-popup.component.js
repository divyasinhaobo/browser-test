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
var browser_1 = require("@mubble/browser");
var animations_1 = require("@angular/animations");
var ROUTE_ANIM_MS = 400;
var ModalPopupComponent = /** @class */ (function (_super) {
    __extends(ModalPopupComponent, _super);
    function ModalPopupComponent(rc, router, route, componentFactoryResolver, renderer, ref) {
        var _this = _super.call(this, rc, router, componentFactoryResolver, route) || this;
        _this.renderer = renderer;
        _this.ref = ref;
        _this.__routeAnimation = true;
        _this.animElem = true;
        _this.routeEndProcessed = false;
        _this.width = "75vw";
        rc.setupLogger(_this, 'ModalPopup', browser_1.LOG_LEVEL.DEBUG);
        _this.rc.isDebug() && _this.rc.debug(_this.rc.getName(_this), 'constructor');
        return _this;
    }
    // @HostBinding('style.z-index')   zIndex   = 3000;
    // @HostBinding('style.background-color') bg   = 'rgba(0,0,0,.5)'
    ModalPopupComponent.prototype.onHostClick = function () {
        this.animateClose();
    };
    ModalPopupComponent.prototype.onRouteAnimationStart = function (event) {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onRouteAnimation-start', event);
    };
    ModalPopupComponent.prototype.onRouteAnimationDone = function (event) {
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
    ModalPopupComponent.prototype.onRouterInit = function (params) {
        _super.prototype.onRouterInit.call(this, params, this.injectAt, true);
        this.width = this.injectedComponent.getWidth();
        if (this.injectedComponent.getCssClassName) {
            this.className = this.injectedComponent.getCssClassName();
        }
    };
    ModalPopupComponent.prototype.ngAfterViewInit = function () {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'ngAfterViewInit');
    };
    ModalPopupComponent.prototype.onClick = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    ModalPopupComponent.prototype.ignoreScroll = function (event) {
        var notScrollable = this.injectedComponent.isNotScrollable
            && this.injectedComponent.isNotScrollable();
        if (notScrollable) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    ModalPopupComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'ngOnDestroy');
    };
    ModalPopupComponent.prototype.animateClose = function () {
        if (this.injectedComponent.isNotDismissable &&
            this.injectedComponent.isNotDismissable()) {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Wont dismiss popup');
        }
        else {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Dismissing modal popup in due to host click');
            this.router.goBack();
        }
    };
    ModalPopupComponent.prototype.onBackPressed = function () {
        this.backPressed = true;
    };
    ModalPopupComponent.prototype.canGoBack = function () {
        var childComponent = this.injectedComponent;
        return childComponent.canGoBack ? childComponent.canGoBack() : true;
    };
    var _a, _b, _c, _d, _e, _f, _g;
    __decorate([
        core_1.HostBinding('class.glb-flex-centered'),
        __metadata("design:type", Object)
    ], ModalPopupComponent.prototype, "true", void 0);
    __decorate([
        core_1.HostBinding('@routeAnimation'),
        __metadata("design:type", Object)
    ], ModalPopupComponent.prototype, "__routeAnimation", void 0);
    __decorate([
        core_1.HostBinding('class.glb-animated-element'),
        __metadata("design:type", Object)
    ], ModalPopupComponent.prototype, "animElem", void 0);
    __decorate([
        core_1.HostListener('click', ['$event.target']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ModalPopupComponent.prototype, "onHostClick", null);
    __decorate([
        core_1.HostListener('@routeAnimation.start', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ModalPopupComponent.prototype, "onRouteAnimationStart", null);
    __decorate([
        core_1.HostListener('@routeAnimation.done', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ModalPopupComponent.prototype, "onRouteAnimationDone", null);
    __decorate([
        core_1.ViewChild('componentContainer', { static: true }),
        __metadata("design:type", typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _a : Object)
    ], ModalPopupComponent.prototype, "componentContainer", void 0);
    __decorate([
        core_1.ViewChild('injectAt', { read: core_1.ViewContainerRef, static: true }),
        __metadata("design:type", Object)
    ], ModalPopupComponent.prototype, "injectAt", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ModalPopupComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ModalPopupComponent.prototype, "className", void 0);
    ModalPopupComponent = __decorate([
        core_1.Component({
            selector: 'modal-popup',
            templateUrl: './modal-popup.component.html',
            styleUrls: ['./modal-popup.component.scss'],
            animations: [
                // trigger('routeAnimation', [
                //   state('*', 
                //     style({
                //       'background-color': 'rgba(31,30,76, 0.6)', //primary color's 900 shade
                //       opacity: 1
                //     })
                //   ),
                //   transition(':enter', [
                //     style({
                //       'background-color': 'rgba(0,0,0,0)',
                //       opacity: 1
                //     }),
                //     animate('1500ms')
                //   ]),
                //   transition(':leave', [
                //     animate('500ms', style({
                //       'background-color': 'rgba(0,0,0,0)',
                //       opacity: 0
                //     }))
                //   ])
                // ]),
                // trigger('ccAnimate', [
                //   state('*',
                //     style({
                //       'transform': 'rotateX(0deg)',
                //     })
                //   ),
                //   transition(':enter', [
                //     style({
                //       'transform': 'rotateX(90deg)',
                //     }),
                //     animate('300ms cubic-bezier(0.55, 0.055, 0.675, 0.19)')
                //   ])
                // ])    
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
                            animations_1.query('div.modal-root-div', [
                                animations_1.style({
                                    transform: 'rotateX(90deg)'
                                }),
                                animations_1.animate(ROUTE_ANIM_MS, animations_1.style('*'))
                            ])
                        ])
                    ]),
                    animations_1.transition(':leave', [
                        animations_1.group([
                            animations_1.animate(ROUTE_ANIM_MS, animations_1.style({
                                opacity: 0
                            }))
                        ])
                    ])
                ])
            ]
        }),
        __param(0, core_1.Inject('RunContext')),
        __metadata("design:paramtypes", [typeof (_b = typeof browser_1.RunContextBrowser !== "undefined" && browser_1.RunContextBrowser) === "function" ? _b : Object, typeof (_c = typeof browser_1.UiRouter !== "undefined" && browser_1.UiRouter) === "function" ? _c : Object, typeof (_d = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" ? _d : Object, typeof (_e = typeof core_1.ComponentFactoryResolver !== "undefined" && core_1.ComponentFactoryResolver) === "function" ? _e : Object, typeof (_f = typeof core_1.Renderer2 !== "undefined" && core_1.Renderer2) === "function" ? _f : Object, typeof (_g = typeof core_1.ChangeDetectorRef !== "undefined" && core_1.ChangeDetectorRef) === "function" ? _g : Object])
    ], ModalPopupComponent);
    return ModalPopupComponent;
}(browser_1.InjectionParentBase));
exports.ModalPopupComponent = ModalPopupComponent;
//# sourceMappingURL=modal-popup.component.js.map