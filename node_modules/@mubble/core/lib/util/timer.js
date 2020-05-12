"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Wed Jun 28 2017
   Author     : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
var TimerInstance = /** @class */ (function () {
    // The callback should return ms to tick after (not the absolute time)
    function TimerInstance(timer, name, cb) {
        this.timer = timer;
        this.name = name;
        this.cb = cb;
    }
    TimerInstance.prototype.tickAfter = function (ms, overwrite) {
        return this.timer._tickAfter(this, ms, overwrite);
    };
    TimerInstance.prototype.remove = function () {
        return this.timer._remove(this);
    };
    return TimerInstance;
}());
exports.TimerInstance = TimerInstance;
/**
 * Timer tickAfter is coded to resemble setTimeout. Here are key differences:
 *
 *  - If you call tickAfter function multiple times, it remembers the lowest time interval at which it should callback.
 *    If you wish to override the stored value, you should pass overwrite flag
 *
 *  - When the chosen time arrives, your callback is called. However, callback processing is special as noted below.
 *
 *  - Callbacks are unique and you are allowed to register only one timer per callback function
 *
 *  - The callback if returns a value, timer is rescheduled to tick after that much time. Returning a 0 will
 *    automatically cancel your subscription. If during the callback processing there is a call to tickAfter/remove
 *    return value is ignored
 *
 *  - It provides as a efficient helper in managing the timer. You need not worry about memory leak, if your cb returns
 *    right value, depending on the situation. A remove function is provided, in case you never return a zero in
 *    your callback
 *
 *  - One class can have 'n' timers for different purpose, without worrying about managing timer. You should have different
 *    callbacks in such cases
 */
var Timer = /** @class */ (function () {
    function Timer() {
        this.subscriptions = [];
        this.currentTimer = null;
        this.nextTs = 0;
        this.logging = false;
        this.cbTimer = this.timerEvent.bind(this);
    }
    Timer.prototype.register = function (name, cb) {
        var subs = this.subscriptions, sub = subs.find(function (s) { return s.cb === cb; });
        if (sub)
            return sub; // only one timer allowed per callback
        return new TimerInstance(this, name, cb);
    };
    /**
     * Subscribe to timer
     * @param cb Callback
     * @param ms milli-seconds to tick after
     * @param overwrite Overwrite the old subscription with this one. Read main comment
     */
    Timer.prototype._tickAfter = function (sub, ms, overwrite) {
        var subs = this.subscriptions, now = Date.now();
        var nextTickAt = now + ms, index = subs.indexOf(sub);
        if (index !== -1) { // already subscribed
            if (overwrite || sub.nextTickAt >= nextTickAt || sub.nextTickAt <= now) {
                sub.nextTickAt = nextTickAt;
                this.logging && console.info(sub.name + ":tickAfter modified " + ms + " ms overwrite:" + overwrite + " for supplied value");
            }
            else {
                nextTickAt = sub.nextTickAt;
                this.logging && console.info(sub.name + ":tickAfter ignoring after " + ms + " as old value is lower");
            }
        }
        else { // not subscribed
            sub.nextTickAt = nextTickAt;
            subs.push(sub);
            this.logging && console.info(sub.name + ":tickAfter inserted after " + ms);
        }
        if (this.nextTs > nextTickAt || !this.nextTs) {
            if (this.currentTimer)
                clearTimeout(this.currentTimer);
            this.currentTimer = setTimeout(this.cbTimer, nextTickAt - now);
            this.nextTs = nextTickAt;
            this.logging && console.info(sub.name + ":tickAfter timer scheduled after " + (nextTickAt - now) + " ms length:" + subs.length);
        }
    };
    /**
     * Removes timer subscription. Read main comments to understand usage of this
     * @param cb
     */
    Timer.prototype._remove = function (sub) {
        var index = this.subscriptions.indexOf(sub);
        if (index !== -1) {
            // We don't worry about the timeout call on timer as it managed in timeout
            var sub_1 = this.subscriptions.splice(index, 1)[0];
            this.logging && console.info(sub_1.name + ":removed timer length:" + this.subscriptions.length);
        }
    };
    Timer.prototype.timerEvent = function () {
        var now = Date.now(), subs = this.subscriptions;
        var nextTickAt = Number.MAX_SAFE_INTEGER, selectedSub;
        for (var i = 0; i < subs.length; i++) {
            var sub = subs[i];
            var thisTickAt = sub.nextTickAt;
            if (thisTickAt <= now) { // time elapsed
                var thisNextTick = sub.cb(), updatedSub = subs[i];
                if (updatedSub !== sub) { // During timeout timer was removed via remove() call
                    i--;
                    continue;
                }
                else if (thisTickAt !== updatedSub.nextTickAt) { // timeout got modified via tickAfter() during the callback, ignore return value
                    thisTickAt = updatedSub.nextTickAt;
                }
                else if (!thisNextTick || thisNextTick < 0) { // The return value says cancel the timer
                    this.logging && console.info(sub.name + ":timerEvent removed subscription based on callback return value");
                    this.subscriptions.splice(i--, 1);
                    continue;
                }
                else { // Next tick is set via the return value of callback
                    this.logging && console.info(sub.name + ":timerEvent will be re-scheduled after " + thisNextTick);
                    thisTickAt = now + thisNextTick;
                }
            }
            if (nextTickAt > thisTickAt) {
                nextTickAt = thisTickAt;
                selectedSub = sub;
            }
        }
        if (selectedSub) { // Next timer to schedule based on selectedSub tick time
            this.currentTimer = setTimeout(this.cbTimer, nextTickAt - now);
            this.nextTs = nextTickAt;
            this.logging && console.info(selectedSub.name + ":timerEvent timer scheduled after " + (nextTickAt - now) + " ms number of timers:" + subs.length);
        }
        else {
            this.currentTimer = null;
            this.nextTs = 0;
            this.logging && console.info("Timer:timerEvent removed all timers. Assert zeros subs: " + subs.length + " === 0");
        }
    };
    return Timer;
}());
exports.Timer = Timer;
//# sourceMappingURL=timer.js.map