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
var KEYBOARD_MODE;
(function (KEYBOARD_MODE) {
    KEYBOARD_MODE["NORMAL"] = "NORMAL";
    KEYBOARD_MODE["SHOW_DOT"] = "SHOW_DOT";
})(KEYBOARD_MODE = exports.KEYBOARD_MODE || (exports.KEYBOARD_MODE = {}));
var KEY_TYPE;
(function (KEY_TYPE) {
    KEY_TYPE["NUMBER"] = "NUMBER";
    KEY_TYPE["BACK"] = "BACK";
    KEY_TYPE["DONE"] = "DONE";
    KEY_TYPE["DOT"] = "DOT";
})(KEY_TYPE = exports.KEY_TYPE || (exports.KEY_TYPE = {}));
var KeypadComponent = /** @class */ (function () {
    function KeypadComponent(rc) {
        this.rc = rc;
        this.keyPress = new core_1.EventEmitter();
        this.KEYBOARD_MODE = KEYBOARD_MODE;
    }
    KeypadComponent.prototype.ngOnInit = function () {
        if (!this.mode)
            this.mode = KEYBOARD_MODE.NORMAL;
    };
    KeypadComponent.prototype.keyClick = function (inputNum) {
        var data = { key: inputNum, keyType: KEY_TYPE.NUMBER };
        this.keyPress.emit(data);
    };
    KeypadComponent.prototype.onKeyBoardBack = function () {
        var data = { key: null, keyType: KEY_TYPE.BACK };
        this.keyPress.emit(data);
    };
    KeypadComponent.prototype.onKeyBoardOk = function () {
        var data = { key: null, keyType: KEY_TYPE.DONE };
        this.keyPress.emit(data);
    };
    KeypadComponent.prototype.onKeyBoardDot = function () {
        var data = { key: '.', keyType: KEY_TYPE.DOT };
        this.keyPress.emit(data);
    };
    var _a;
    __decorate([
        core_1.Input('mode'),
        __metadata("design:type", String)
    ], KeypadComponent.prototype, "mode", void 0);
    __decorate([
        core_1.Output('keyPress'),
        __metadata("design:type", Object)
    ], KeypadComponent.prototype, "keyPress", void 0);
    KeypadComponent = __decorate([
        core_1.Component({
            selector: 'keypad',
            templateUrl: './keypad.component.html',
            styleUrls: ['./keypad.component.scss']
        }),
        __param(0, core_1.Inject('RunContext')),
        __metadata("design:paramtypes", [typeof (_a = typeof framework_1.RunContextApp !== "undefined" && framework_1.RunContextApp) === "function" ? _a : Object])
    ], KeypadComponent);
    return KeypadComponent;
}());
exports.KeypadComponent = KeypadComponent;
//# sourceMappingURL=keypad.component.js.map