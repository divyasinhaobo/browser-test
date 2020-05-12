"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Mon Jun 19 2017
   Author     : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
// To lock panning on axis, this threshold should be met, example if user moves 5 pixel in x, his movement
// should be 1 pixel or below on y axis
exports.THRESHOLD = .8;
// Gutter width: we support gutters on x axis. Gutter touches are reported as a separate callback
// Gutter is always configured wrt to page dimensions, not component dimensions
exports.GUTTER_WIDTH = 10;
/*---------------------------------------------------------------------------------------------------
Any component that uses nail must implement this interface
Event object passed here is actual DOM event. You should not try to see the event type as it may be
touch / pointer event. Also touchStart may actually be touchMove (after ascertaining the axis)

All events have
  axis: AXIS

The Move Event also has
  direction: DIRECTION
  deltaX
  deltaY

panEnd/gutterEnd event also has:
  speed
----------------------------------------------------------------------------------------------------*/
// Reported back along with change (delta) in panning event
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["UP"] = 1] = "UP";
    DIRECTION[DIRECTION["RIGHT"] = 2] = "RIGHT";
    DIRECTION[DIRECTION["DOWN"] = 4] = "DOWN";
    DIRECTION[DIRECTION["LEFT"] = 8] = "LEFT"; // absolute direction wrt touch start, would mean that we are deltaX is negative
})(DIRECTION = exports.DIRECTION || (exports.DIRECTION = {}));
// Reported along with the event
var AXIS;
(function (AXIS) {
    AXIS[AXIS["X"] = 1] = "X";
    AXIS[AXIS["Y"] = 2] = "Y";
})(AXIS = exports.AXIS || (exports.AXIS = {}));
//# sourceMappingURL=nail-interface.js.map