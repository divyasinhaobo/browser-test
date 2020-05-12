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
var animations_1 = require("@angular/animations");
var ToastComponent = /** @class */ (function () {
    function ToastComponent() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ToastComponent.prototype, "toastMessage", void 0);
    ToastComponent = __decorate([
        core_1.Component({
            selector: 'toast',
            templateUrl: './toast.component.html',
            styleUrls: ['./toast.component.scss'],
            animations: [
                animations_1.trigger('visibilityChanged', [
                    animations_1.transition(':enter', [
                        animations_1.style({ 'opacity': 0 }),
                        animations_1.animate('500ms', animations_1.style({ 'opacity': 1 }))
                    ]),
                    animations_1.transition(':leave', [
                        animations_1.style({ 'opacity': 1 }),
                        animations_1.animate('500ms', animations_1.style({ 'opacity': 0 }))
                    ])
                ]),
            ]
        })
    ], ToastComponent);
    return ToastComponent;
}());
exports.ToastComponent = ToastComponent;
//# sourceMappingURL=toast.component.js.map