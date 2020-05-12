"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var injection_interface_1 = require("./injection-interface");
var InjectionParentBase = /** @class */ (function () {
    function InjectionParentBase(rc, router, componentFactoryResolver, route) {
        this.rc = rc;
        this.router = router;
        this.componentFactoryResolver = componentFactoryResolver;
        this.route = route;
    }
    InjectionParentBase.prototype.onRouterInit = function (params, injectAt, showTitle) {
        this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'onRouterInit called with', params);
        if (!this.injectedComponent) {
            this.injectComponent(params.inject, injectAt);
            this.caller = params[injection_interface_1.INJECTION_PARAM.CALLER];
            if (this.injectedComponent.initFromParent)
                this.injectedComponent.initFromParent(this, showTitle);
            if (this.caller && this.injectedComponent.setCaller)
                this.injectedComponent.setCaller(this.caller);
        }
        if (this.injectedComponent.setParam)
            this.injectedComponent.setParam(params);
    };
    // onInit(injectAt: ViewContainerRef, showTitle: boolean) {
    //   this.querySub = this.route.queryParams.subscribe(inParams => {
    //     const params = this.router.getQueryParams(inParams)
    //     this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'ngOnInit called with', params)
    //     if (!this.injectedComponent) {
    //       this.injectComponent(params.inject, injectAt)
    //       this.caller = params[INJECTION_PARAM.CALLER]
    //       if (this.injectedComponent.initFromParent) this.injectedComponent.initFromParent(this, showTitle)
    //       if (this.caller && this.injectedComponent.setCaller) this.injectedComponent.setCaller(this.caller)
    //     }
    //     if (this.injectedComponent.setParam) this.injectedComponent.setParam(params)
    //   })
    // }
    InjectionParentBase.prototype.injectComponent = function (compName, injectAt) {
        var component = this.router.getComponent(compName);
        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), component);
        var factory = this.componentFactoryResolver.resolveComponentFactory(component);
        this.icRef = injectAt.createComponent(factory);
        this.icRef.changeDetectorRef.detectChanges();
        this.injectedComponent = this.icRef.instance;
        this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'Injected component with', { injected: !!this.injectedComponent, factory: !!factory });
    };
    InjectionParentBase.prototype.close = function () {
        this.childRequestedClose = true;
        this.router.goBack();
    };
    InjectionParentBase.prototype.ngOnDestroy = function () {
        if (this.icRef)
            this.icRef.destroy();
    };
    return InjectionParentBase;
}());
exports.InjectionParentBase = InjectionParentBase;
//# sourceMappingURL=injection-base.js.map