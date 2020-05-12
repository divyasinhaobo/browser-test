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
var rc_browser_1 = require("@mubble/browser/rc-browser");
var GenericPipe = /** @class */ (function () {
    function GenericPipe(rc, injector) {
        this.rc = rc;
        this.injector = injector;
    }
    GenericPipe.prototype.transform = function (value, pipeName, pipeParams) {
        if (!pipeName)
            return value;
        var pipe = this.injector.get(pipeName);
        if (pipe.transform && typeof pipe.transform === 'function') {
            if (pipeParams)
                return pipe.transform.apply(pipe, [value].concat(pipeParams));
            return pipe.transform(value);
        }
        return value;
    };
    var _a, _b;
    GenericPipe = __decorate([
        core_1.Pipe({ name: 'genericPipe' }),
        __param(0, core_1.Inject('RunContext')),
        __metadata("design:paramtypes", [typeof (_a = typeof rc_browser_1.RunContextBrowser !== "undefined" && rc_browser_1.RunContextBrowser) === "function" ? _a : Object, typeof (_b = typeof core_1.Injector !== "undefined" && core_1.Injector) === "function" ? _b : Object])
    ], GenericPipe);
    return GenericPipe;
}());
exports.GenericPipe = GenericPipe;
//# sourceMappingURL=generic.pipe.js.map