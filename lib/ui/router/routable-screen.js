"use strict";
/*------------------------------------------------------------------------------
   About      : Any component which can be directly routed to must extent to
                this class. This kind of component is a screen. All actions
                performed on sub components / HTML elements in this kind of
                component will be logged under the trackable screen name.

   Created on : Sat Nov 03 2018
   Author     : Sid
   
   Copyright (c) 2018 Obopay. All rights reserved.
------------------------------------------------------------------------------*/
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
Object.defineProperty(exports, "__esModule", { value: true });
var trackable_screen_1 = require("./trackable-screen");
var RoutableScreen = /** @class */ (function (_super) {
    __extends(RoutableScreen, _super);
    function RoutableScreen(rc) {
        var _this = _super.call(this, rc) || this;
        _this.rc = rc;
        return _this;
    }
    return RoutableScreen;
}(trackable_screen_1.TrackableScreen));
exports.RoutableScreen = RoutableScreen;
//# sourceMappingURL=routable-screen.js.map