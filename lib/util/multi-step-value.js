"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MultiStepValue = /** @class */ (function () {
    function MultiStepValue(minVal, viewSize, count, applyTol, quickMove) {
        this.minVal = minVal;
        this.viewSize = viewSize;
        this.count = count;
        this.applyTol = applyTol;
        this.quickMove = quickMove;
        this.currentIndex = 0;
        this.currentValue = 0;
        this.tolerance = 0;
        this.maxVal = minVal + viewSize * (count - 1); // -1 is done so that last item is displayed in view
        if (applyTol)
            this.tolerance = viewSize * .25;
    }
    MultiStepValue.prototype.transition = function (delta) {
        var newValue = this.currentValue - delta;
        if (newValue < this.minVal - this.tolerance)
            return this.minVal - this.tolerance;
        if (newValue > this.maxVal + this.tolerance)
            return this.maxVal + this.tolerance;
        return newValue;
    };
    MultiStepValue.prototype.final = function (delta, speed, quickRatio) {
        var newValue = this.transition(delta), chgNeeded = (speed >= .2 ? .1 : .25) * this.viewSize, lowerBound = this.currentIndex * this.viewSize + this.minVal;
        var newIndex;
        if (delta > 0) { // trying to reduce index
            if (this.quickMove) {
                newIndex = (quickRatio && quickRatio > 0) ? Math.round(quickRatio * this.count) : Math.round((lowerBound - newValue) / this.viewSize);
            }
            if ((lowerBound - newValue) >= chgNeeded) {
                this.currentIndex -= this.quickMove ? newIndex : Math.abs(Math.round((lowerBound - newValue) / this.viewSize));
                if (this.currentIndex < 0) {
                    this.currentIndex = 0;
                }
                this.currentValue = this.currentIndex * this.viewSize + this.minVal;
            }
        }
        else {
            if (this.quickMove) {
                newIndex = (quickRatio && quickRatio > 0) ? Math.round(quickRatio * this.count) : Math.round((newValue - lowerBound) / this.viewSize);
            }
            if ((newValue - lowerBound) >= chgNeeded) {
                this.currentIndex += this.quickMove ? newIndex : Math.round((newValue - lowerBound) / this.viewSize);
                if (this.currentIndex >= this.count) {
                    this.currentIndex = this.count - 1;
                }
                this.currentValue = this.currentIndex * this.viewSize + this.minVal;
            }
        }
    };
    return MultiStepValue;
}());
exports.MultiStepValue = MultiStepValue;
//# sourceMappingURL=multi-step-value.js.map