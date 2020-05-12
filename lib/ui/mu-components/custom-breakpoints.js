"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var flex_layout_1 = require("@angular/flex-layout");
var CUSTOM_BREAKPOINTS = [
    {
        alias: "sm",
        suffix: "sm",
        mediaQuery: "screen and (min-width: 780px) and (max-width: 959px)",
        overlapping: false
    }
];
exports.CustomBreakPointsProvider = {
    provide: flex_layout_1.BREAKPOINT,
    useValue: CUSTOM_BREAKPOINTS,
    multi: true
};
//# sourceMappingURL=custom-breakpoints.js.map