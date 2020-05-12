"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var bottom_in_component_1 = require("./bottom-in/bottom-in.component");
var modal_popup_component_1 = require("./modal-popup/modal-popup.component");
var shared_router_constants_1 = require("../router/shared-router-constants");
var loading_overlay_component_1 = require("./loading/loading-overlay/loading-overlay.component");
var filter_component_1 = require("./filter/filter.component");
var routes = [
    {
        path: shared_router_constants_1.ComponentRoutes.LoadingOverlay,
        component: loading_overlay_component_1.LoadingOverlayComponent
    },
    {
        path: shared_router_constants_1.ComponentRoutes.Modal,
        component: modal_popup_component_1.ModalPopupComponent,
        outlet: 'modal'
    },
    {
        path: shared_router_constants_1.ComponentRoutes.BottomIn,
        component: bottom_in_component_1.BottomInComponent,
        outlet: 'modal'
    },
    {
        path: shared_router_constants_1.ComponentRoutes.Filter,
        component: filter_component_1.FilterComponent
    }
];
var MuComponentsRoutingModule = /** @class */ (function () {
    function MuComponentsRoutingModule() {
    }
    MuComponentsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(routes)
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], MuComponentsRoutingModule);
    return MuComponentsRoutingModule;
}());
exports.MuComponentsRoutingModule = MuComponentsRoutingModule;
//# sourceMappingURL=mu-components-routing.module.js.map