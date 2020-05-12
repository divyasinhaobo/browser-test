"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Mon Jun 19 2017
   Author     : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@mubble/core");
var nail_interface_1 = require("./nail-interface");
var rc_browser_1 = require("../../rc-browser");
var NEXT_SESSION_ID = 1;
var TouchSession = /** @class */ (function () {
    function TouchSession() {
        this.startX = -1; // indicates a uninitialized TouchSession
        this.id = NEXT_SESSION_ID++;
    }
    return TouchSession;
}());
// later these will be configured by looking at dom capabilities
var TOUCH_EVENT = {
    START: 'touchstart',
    MOVE: 'touchmove',
    END: 'touchend',
    CANCEL: 'touchcancel'
};
// const TOUCH_EVENT = {
//   START   : 'pointerdown',
//   MOVE    : 'pointermove',
//   END     : 'pointerup',
//   CANCEL  : 'pointercancel'
// }
var THRESHOLD_PIXELS = 1;
var MAX_THRESHOLD_PIXELS = 10;
var FAST_MIN_SPEED = 2;
var FAST_MAX_SPEED = 8;
var Nail = /** @class */ (function () {
    function Nail(rc, element, appComponent, renderer, config) {
        this.rc = rc;
        this.element = element;
        this.appComponent = appComponent;
        this.renderer = renderer;
        this.measure = false;
        this.handlers = [];
        rc.setupLogger(this, 'Nail', rc_browser_1.LOG_LEVEL.STATUS);
        this.compName = appComponent.constructor ? appComponent.constructor.name : '?';
        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), config.axisX || config.axisY, 'Nail needs to be configured for at least one axes');
        this.setConfig(config);
        this.pageWidth = document.body.clientWidth;
        var panEventHandler = this.onNailEvent.bind(this);
        this.handlers.push(renderer.listen(element, TOUCH_EVENT.START, panEventHandler), renderer.listen(element, TOUCH_EVENT.MOVE, panEventHandler), renderer.listen(element, TOUCH_EVENT.END, panEventHandler), renderer.listen(element, TOUCH_EVENT.CANCEL, panEventHandler));
        this.animateFn = this.onRunAnimation.bind(this);
        rc.isStatus() && rc.status(rc.getName(this), 'Nail events are being monitored for', this.compName, 'with config', config);
    }
    Nail.prototype.changeConfig = function (config) {
        this.setConfig(config);
        // See if we can create a DOM Event object ???? TODO
        if (this.session)
            this.panEndEvent({ type: 'simulatedPanEnd' });
    };
    Nail.prototype.requestAnimate = function () {
        var animateParam = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            animateParam[_i] = arguments[_i];
        }
        if (this.session) {
            this.session.animateParam = animateParam;
            if (this.session.animHandle)
                window.cancelAnimationFrame(this.session.animHandle);
            this.session.animHandle = window.requestAnimationFrame(this.animateFn);
            this.session.animSessionId = this.session.id;
        }
    };
    Nail.prototype.setDirections = function (disallowLeft, disallowRight) {
        this.config.disallowLeft = disallowLeft;
        this.config.disallowRight = disallowRight;
    };
    Nail.prototype.setConfig = function (config) {
        config.threshold = config.threshold || nail_interface_1.THRESHOLD;
        config.gutterWidth = config.gutterWidth || nail_interface_1.GUTTER_WIDTH;
        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), config.threshold <= 1, 'Threshold cannot be more than 1');
        this.config = config;
    };
    Nail.prototype.onNailEvent = function (event) {
        var session = this.session, config = this.config;
        // console.log(event.type, 'with',  event.touches.length, 'touches')
        // no axis is being monitored
        if (!(this.config.axisX || this.config.axisY))
            return;
        if (event.type === TOUCH_EVENT.START) {
            if (event.touches && event.touches.length !== 1)
                return;
            if (this.session)
                this.panEndEvent({ type: 'simulatedPanEnd' });
            this.session = new TouchSession();
            this.extractEventAttr(event);
            if (this.measure) {
                this.session.perf = new core_1.PerformanceMetrics('nail-' + this.compName);
            }
            if (this.appComponent.onTouchStart)
                this.appComponent.onTouchStart(event);
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), this.compName, event.type, 'received');
        }
        else if (event.type === TOUCH_EVENT.MOVE) {
            if (!session || session.ignore)
                return;
            if (event.touches && event.touches.length !== 1) {
                session.ignore = true;
                return;
            }
            this.extractEventAttr(event);
            var deltaX = session.lastX - session.startX, deltaY = session.lastY - session.startY;
            if (!session.axis) { // we try to find if we can establish the direction of movement
                if (this.measure)
                    this.session.perf.startStep('ascertain');
                var ascertained = this.ascertainDirection(event, deltaX, deltaY);
                if (this.measure)
                    this.session.perf.endStep('ascertain');
                if (!ascertained)
                    return;
            }
            if (this.measure)
                this.session.perf.startStep(TOUCH_EVENT.MOVE);
            event.axis = session.axis;
            if (session.axis === nail_interface_1.AXIS.X) {
                event.deltaX = deltaX;
                event.deltaY = 0;
                event.direction = deltaX > 0 ? nail_interface_1.DIRECTION.RIGHT : nail_interface_1.DIRECTION.LEFT;
            }
            else {
                event.deltaX = 0;
                event.deltaY = deltaY;
                event.direction = deltaY > 0 ? nail_interface_1.DIRECTION.DOWN : nail_interface_1.DIRECTION.UP;
            }
            if (this.measure)
                this.session.perf.startStep('onPanMove');
            var consumed = session.ifNail.onPanMove(event);
            if (this.measure)
                this.session.perf.endStep('onPanMove');
            if (this.measure)
                this.session.perf.endStep(TOUCH_EVENT.MOVE);
            if (consumed) {
                this.rc.isDebug() && this.rc.debug(this.rc.getName(this), this.compName, event.type, 'consumed event', { deltaX: deltaX, deltaY: deltaY, eventY: event.deltaY, session: session });
                event.preventDefault();
                event.stopPropagation();
                return true;
            }
            else {
                this.rc.isDebug() && this.rc.debug(this.rc.getName(this), this.compName, event.type, 'ignored event', { deltaX: deltaX, deltaY: deltaY, eventY: event.deltaY, session: session });
            }
        }
        else { // end or cancel event
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), this.compName, event.type, 'received');
            if (this.session)
                this.panEndEvent(event);
        }
    };
    Nail.prototype.panEndEvent = function (event) {
        if (this.measure)
            this.session.perf.startStep(event.type);
        var session = this.session;
        // If we have not ascertained
        if (session.axis) {
            event.axis = session.axis;
            var deltaMs = Date.now() - session.startTs;
            event.deltaY = session.lastY - session.startY;
            event.deltaX = session.lastX - session.startX;
            var change = Math.abs(session.axis === nail_interface_1.AXIS.X ? event.deltaX : event.deltaY), speed = deltaMs ? (change * 1000 / (deltaMs * deltaMs)) : 0;
            var quickRatio = (speed - FAST_MIN_SPEED) / (FAST_MAX_SPEED - FAST_MIN_SPEED);
            quickRatio = quickRatio < 0 ? 0 : (quickRatio > 0.5 ? 0.5 : quickRatio);
            event.quickRatio = quickRatio;
            event.speed = speed;
            event.timeTaken = deltaMs;
            // this.rc.isWarn() && this.rc.warn(this.rc.getName(this), {change, deltaMs, speed, 
            //   quickRatio, FAST_MIN_SPEED, FAST_MAX_SPEED})
            if (this.measure)
                this.session.perf.startStep('onPanEnd');
            session.ifNail.onPanEnd(event);
            if (this.measure)
                this.session.perf.endStep('onPanEnd');
        }
        else if (this.appComponent.onTouchEnd) {
            this.appComponent.onTouchEnd(event);
        }
        if (this.measure)
            this.session.perf.endStep(event.type);
        if (this.measure)
            this.session.perf.finish();
        this.session = null;
    };
    Nail.prototype.extractEventAttr = function (event) {
        var session = this.session;
        var touch = event.touches[0];
        session.lastX = touch.pageX;
        session.lastY = touch.pageY;
        if (session.startX === -1) {
            session.startX = session.lastX;
            session.startY = session.lastY;
            session.startTs = Date.now();
        }
    };
    // figure out direction of movement
    Nail.prototype.ascertainDirection = function (event, deltaX, deltaY) {
        var session = this.session, config = this.config, posDx = Math.abs(deltaX), posDy = Math.abs(deltaY);
        var axis = 0;
        if (posDx >= THRESHOLD_PIXELS && (config.threshold > (posDy / posDx))) {
            axis = nail_interface_1.AXIS.X;
        }
        else if (Math.abs(posDy) >= THRESHOLD_PIXELS && (config.threshold > (posDx / posDy))) {
            axis = nail_interface_1.AXIS.Y;
        }
        else if (posDx > MAX_THRESHOLD_PIXELS) {
            axis = nail_interface_1.AXIS.X;
        }
        else if (posDy > MAX_THRESHOLD_PIXELS) {
            axis = nail_interface_1.AXIS.Y;
        }
        if (!axis)
            return false;
        if (!((axis === nail_interface_1.AXIS.X && config.axisX) || (axis === nail_interface_1.AXIS.Y && config.axisY))) {
            this.rc.isStatus() && this.rc.status(this.rc.getName(this), this.compName, 'Cancelling ascertain as we locked incorrect axis');
            session.ignore = true;
            return;
        }
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), this.compName, event.type, 'Ascertained', axis, { deltaX: deltaX, deltaY: deltaY });
        session.axis = axis;
        if (((session.startX < config.gutterWidth) || (deltaX > 0 && config.disallowRight)) && config.gutterLeft) {
            session.ifNail = config.gutterLeft;
        }
        else if (((session.startX > (this.pageWidth - config.gutterWidth)) || (deltaX < 0 && config.disallowLeft)) && config.gutterRight) {
            session.ifNail = config.gutterRight;
        }
        else {
            session.ifNail = this.appComponent;
        }
        event.axis = session.axis;
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        if (this.session.ifNail.onPanStart) {
            if (this.measure)
                this.session.perf.startStep('onPanStart');
            this.session.ifNail.onPanStart(event);
            if (this.measure)
                this.session.perf.endStep('onPanStart');
        }
        return true;
    };
    Nail.prototype.onRunAnimation = function () {
        var _a;
        var session = this.session;
        if (!session)
            return;
        this.session.animHandle = null;
        if (session.ignore || session.animSessionId !== session.id)
            return;
        (_a = session.ifNail).onPanAnimate.apply(_a, session.animateParam);
    };
    Nail.prototype.destroy = function () {
        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            handler();
        }
        this.handlers = [];
        this.config = null;
        this.session = null;
    };
    return Nail;
}());
exports.Nail = Nail;
//# sourceMappingURL=nail.js.map