"use strict";
/*------------------------------------------------------------------------------
   About      : Any component be it routable or not which needs to be tracked
                for analytics must extent this class. All actions performed
                on sub components / HTML elements in this kind of component
                will be logged under the trackable screen name.

   Created on : Sat Nov 03 2018
   Author     : Sid
   
   Copyright (c) 2018 Obopay. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
var TrackableScreen = /** @class */ (function () {
    function TrackableScreen(rc) {
        this.rc = rc;
    }
    TrackableScreen.prototype.onApiComplete = function (success) {
    };
    TrackableScreen.prototype.ngOnDestroy = function () {
        // if (this.rc.userKeyVal.clientId && this.isUserVisited()) {
        //   const key = Object.keys(ComponentRoute)
        //     .find(key => ComponentRoute[key] === this.getRouteName())
        //    this.rc.userKeyVal.setScreenVisited(key)
        // }
    };
    return TrackableScreen;
}());
exports.TrackableScreen = TrackableScreen;
//# sourceMappingURL=trackable-screen.js.map