"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InputValidator = /** @class */ (function () {
    function InputValidator() {
    }
    InputValidator.dateValidator = function (control) {
        var startDateTS = control.get('startDate').value, endDateTS = control.get('endDate').value;
        if (startDateTS) {
            var isDate = void 0;
            switch (typeof startDateTS) {
                case "string":
                    isDate = !isNaN(Date.parse(startDateTS));
                    break;
                case "object":
                    isDate = startDateTS instanceof Date
                        ? !isNaN(startDateTS.getTime())
                        : false;
                    break;
                default: isDate = false;
            }
            if (isDate) {
                startDateTS = startDateTS.getTime();
            }
            else {
                startDateTS = startDateTS.toDate().getTime();
            }
        }
        if (endDateTS) {
            var isDate = void 0;
            switch (typeof endDateTS) {
                case "string":
                    isDate = !isNaN(Date.parse(endDateTS));
                    break;
                case "object":
                    isDate = endDateTS instanceof Date
                        ? !isNaN(endDateTS.getTime())
                        : false;
                    break;
                default: isDate = false;
            }
            if (isDate) {
                endDateTS = endDateTS.getTime();
            }
            else {
                endDateTS = endDateTS.toDate().getTime();
            }
        }
        if (!startDateTS && endDateTS) {
            control.get('startDate').setErrors({ noStartDate: true });
        }
        else if (endDateTS && startDateTS && (endDateTS - startDateTS < 0)) {
            control.get('startDate').setErrors({ startDateExceed: true });
        }
        else {
            return null;
        }
    };
    InputValidator.futureDateValidatorIfAllowed = function (control) {
        var startDateTS = control.get('startDate').value, endDateTS = control.get('endDate').value;
        var dateNowTS = Date.now();
        if (startDateTS) {
            var isDate = void 0;
            switch (typeof startDateTS) {
                case "string":
                    isDate = !isNaN(Date.parse(startDateTS));
                    break;
                case "object":
                    isDate = startDateTS instanceof Date
                        ? !isNaN(startDateTS.getTime())
                        : false;
                    break;
                default: isDate = false;
            }
            if (isDate) {
                startDateTS = startDateTS.getTime();
            }
            else {
                startDateTS = startDateTS.toDate().getTime();
            }
        }
        if (endDateTS) {
            var isDate = void 0;
            switch (typeof endDateTS) {
                case "string":
                    isDate = !isNaN(Date.parse(endDateTS));
                    break;
                case "object":
                    isDate = endDateTS instanceof Date
                        ? !isNaN(endDateTS.getTime())
                        : false;
                    break;
                default: isDate = false;
            }
            if (isDate) {
                endDateTS = endDateTS.getTime();
            }
            else {
                endDateTS = endDateTS.toDate().getTime();
            }
        }
        if (endDateTS && (dateNowTS - endDateTS) < 0) {
            control.get('endDate').setErrors({ futureDate: true });
        }
        else if (startDateTS && (dateNowTS - startDateTS) < 0) {
            control.get('startDate').setErrors({ futureDate: true });
        }
    };
    InputValidator.amountValidator = function (control) {
        var minAmount = control.get('minAmount').value
            ? control.get('minAmount').value
            : null, maxAmount = control.get('maxAmount').value
            ? control.get('maxAmount').value
            : null;
        if (!minAmount && maxAmount) {
            control.get('minAmount').setErrors({ noMinAmount: true });
        }
        else if (maxAmount && minAmount && (maxAmount - minAmount < 0)) {
            control.get('minAmount').setErrors({ minAmountExceed: true });
        }
        else {
            return null;
        }
    };
    InputValidator.futureDateValidator = function (control) {
        if (!control.value)
            return null;
        var dateNowTS = Date.now();
        var date = control.value;
        if (date) {
            var isDate = void 0;
            switch (typeof date) {
                case "string":
                    isDate = !isNaN(Date.parse(date));
                    break;
                case "object":
                    isDate = date instanceof Date
                        ? !isNaN(date.getTime())
                        : false;
                    break;
                default: isDate = false;
            }
            if (isDate) {
                date = date.getTime();
            }
            else {
                date = date.toDate().getTime();
            }
        }
        if (date && (dateNowTS - date) < 0) {
            return { futureDate: true };
        }
        else {
            return null;
        }
    };
    return InputValidator;
}());
exports.InputValidator = InputValidator;
//# sourceMappingURL=input-validator.js.map