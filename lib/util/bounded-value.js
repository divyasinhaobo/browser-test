"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BoundedValue = /** @class */ (function () {
    function BoundedValue(initState, finalState, contInitState, contFinalState) {
        // for the element
        this.value = initState;
        this.elemDirUp = (initState < finalState);
        this.elemLow = this.elemDirUp ? initState : finalState;
        this.elemHigh = this.elemDirUp ? finalState : initState;
        // for the controller
        this.contDirUp = (contInitState < contFinalState);
        this.contLow = this.contDirUp ? contInitState : contFinalState;
        this.contHigh = this.contDirUp ? contFinalState : contInitState;
    }
    BoundedValue.prototype.compute = function (contValue) {
        var oldValue = this.value;
        if (contValue <= this.contLow) {
            this.value = this.elemDirUp ? this.elemLow : this.elemHigh;
        }
        else if (contValue >= this.contHigh) {
            this.value = this.elemDirUp ? this.elemHigh : this.elemLow;
        }
        else {
            var totalDiff = this.contHigh - this.contLow, thisDiff = contValue - this.contLow, elemDiff = this.elemHigh - this.elemLow;
            if (this.elemDirUp) {
                this.value = this.elemLow + elemDiff * thisDiff / totalDiff;
            }
            else {
                this.value = this.elemHigh - elemDiff * thisDiff / totalDiff;
            }
        }
        return this.value !== oldValue;
    };
    BoundedValue.prototype.getDecimalValue = function (digitsAfterDecimal) {
        return Number(this.value.toFixed(digitsAfterDecimal || 0));
    };
    BoundedValue.prototype.isCloserToInit = function () {
        var lowDiff = this.value - this.elemLow, highDiff = this.elemHigh - this.value;
        if (lowDiff < highDiff) {
            return this.elemDirUp;
        }
        else {
            return !this.elemDirUp;
        }
    };
    return BoundedValue;
}());
exports.BoundedValue = BoundedValue;
//# sourceMappingURL=bounded-value.js.map