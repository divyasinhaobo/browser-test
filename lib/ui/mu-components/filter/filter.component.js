"use strict";
/*------------------------------------------------------------------------------
   About      : Generic component for filtering which can either be date,
                date-range, dropdown list, number, number-range or text
                search
   
   Created on : Tue Jun 11 2019
   Author     : Divya Sinha
   
   Copyright (c) 2019 Obopay. All rights reserved.
------------------------------------------------------------------------------*/
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
var trackable_screen_1 = require("../../../ui/router/trackable-screen");
var rc_browser_1 = require("../../../rc-browser");
var core_2 = require("@mubble/core");
var CONTEXT;
(function (CONTEXT) {
    CONTEXT[CONTEXT["INIT"] = 0] = "INIT";
    CONTEXT[CONTEXT["CLEAR"] = 1] = "CLEAR";
})(CONTEXT || (CONTEXT = {}));
var FilterComponent = /** @class */ (function () {
    function FilterComponent(rc) {
        this.rc = rc;
        this.filterItems = [];
        this.webMode = false; //if we want to use filter component as full page
        this.displayCount = 1;
        this.displayMode = core_2.DISPLAY_MODE.HORIZONTAL;
        this.selectedFilter = new core_1.EventEmitter();
        this.filters = [];
        this.DISPLAY_MODE = core_2.DISPLAY_MODE;
        this.filterChips = [];
    }
    FilterComponent.prototype.ngOnInit = function () {
        this.initialize(CONTEXT.INIT);
    };
    /*=====================================================================
                                    HTML
    =====================================================================*/
    FilterComponent.prototype.applyFilters = function () {
        this.filterChips = [];
        var inputContInstances = this.inputContInstances.toArray();
        inputContInstances.forEach(function (inputContInstance) {
            inputContInstance.onSubmit();
        });
        if (this.hasError())
            return;
        if (!this.valueChanged()) {
            this.selectedFilter.emit([]); //empty array indicates that the previous filters and current filters are same
            return;
        }
        this.selectedFilter.emit(this.filters);
    };
    FilterComponent.prototype.clearFilters = function () {
        var inputContInstances = this.inputContInstances.toArray();
        inputContInstances.forEach(function (inputContInstance) {
            inputContInstance.onSubmit();
        });
        this.initialize(CONTEXT.CLEAR);
        this.filterChips = [];
        this.selectedFilter.emit(undefined); //on clearing, we just return undefined
    };
    FilterComponent.prototype.setFilterItems = function (event) {
        this.setFilterChips(event);
        var index = this.filters.findIndex(function (element) { return element.id === event.id; });
        this.filters[index].value = event.value;
    };
    /*=====================================================================
                                    PRIVATE
    =====================================================================*/
    FilterComponent.prototype.hasError = function () {
        var inputContInstances = this.inputContInstances.toArray();
        return inputContInstances.some(function (inputContInstance) {
            return inputContInstance.hasError();
        });
    };
    FilterComponent.prototype.valueChanged = function () {
        var _loop_1 = function (fItem) {
            var index = this_1.filters.findIndex(function (element) { return element.id === fItem.params.id; });
            var changed = false;
            //checking if the previous filter value has changed or not according to the display type
            switch (fItem.params.displayType) {
                case core_2.DISPLAY_TYPE.CALENDAR_BOX:
                case core_2.DISPLAY_TYPE.INPUT_BOX:
                case core_2.DISPLAY_TYPE.SELECTION_BOX:
                case core_2.DISPLAY_TYPE.ROW_INPUT_BOX:
                case core_2.DISPLAY_TYPE.MULTI_CHECK_BOX:
                case core_2.DISPLAY_TYPE.RADIO:
                case core_2.DISPLAY_TYPE.AUTOCOMPLETE_SELECT:
                    (!fItem.params.value && !this_1.filters[index].value)
                        ? changed = false
                        : changed = fItem.params.value !== this_1.filters[index].value;
                    break;
                case core_2.DISPLAY_TYPE.DATE_RANGE:
                    ((!fItem.params.value['startDate'] && !this_1.filters[index].value['startDate']) &&
                        (!fItem.params.value['endDate'] && !this_1.filters[index].value['endDate']))
                        ? changed = false
                        : changed = (fItem.params.value['startDate'] !== this_1.filters[index].value['startDate']) ||
                            (fItem.params.value['endDate'] !== this_1.filters[index].value['endDate']);
                    break;
                case core_2.DISPLAY_TYPE.NUMBER_RANGE:
                    ((!fItem.params.value['minAmount'] && !this_1.filters[index].value['minAmount']) &&
                        (!fItem.params.value['maxAmount'] && !this_1.filters[index].value['maxAmount']))
                        ? changed = false
                        : changed = (fItem.params.value['minAmount'] !== this_1.filters[index].value['minAmount']) ||
                            (fItem.params.value['maxAmount'] !== this_1.filters[index].value['maxAmount']);
                    break;
            }
            if (changed)
                return { value: changed };
        };
        var this_1 = this;
        for (var _i = 0, _a = this.filterItems; _i < _a.length; _i++) {
            var fItem = _a[_i];
            var state_1 = _loop_1(fItem);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return false;
    };
    FilterComponent.prototype.initialize = function (context) {
        if (context === CONTEXT.INIT) {
            for (var _i = 0, _a = this.filterItems; _i < _a.length; _i++) {
                var fItem = _a[_i];
                this.filters.push({ id: fItem.params.id, value: fItem.params.value, mode: fItem.mode });
            }
        }
        else {
            this.filters = [];
            var fItems = [];
            for (var _b = 0, _c = this.filterItems; _b < _c.length; _b++) {
                var fItem = _c[_b];
                var setNull = fItem.params.displayType === core_2.DISPLAY_TYPE.DATE_RANGE
                    ? { startDate: null, endDate: null }
                    : fItem.params.displayType === core_2.DISPLAY_TYPE.NUMBER_RANGE
                        ? { minAmount: null, maxAmount: null }
                        : null;
                fItem.params.value = setNull;
                fItems.push({
                    params: fItem.params,
                    mode: fItem.mode
                });
                this.filters.push({ id: fItem.params.id, value: setNull, mode: fItem.mode });
            }
            this.filterItems = [];
            this.filterItems = fItems;
        }
    };
    FilterComponent.prototype.setFilterChips = function (event) {
        var _this = this;
        switch (event.displayType) {
            case core_2.DISPLAY_TYPE.CALENDAR_BOX:
                //Do we need it?
                break;
            case core_2.DISPLAY_TYPE.INPUT_BOX:
            case core_2.DISPLAY_TYPE.ROW_INPUT_BOX:
                if (event.value)
                    this.filterChips.push(event.value);
                break;
            case core_2.DISPLAY_TYPE.MULTI_CHECK_BOX:
                if (event.value) {
                    var checkboxValues = event.value;
                    checkboxValues.forEach(function (val) {
                        _this.filterChips.push(val.value);
                    });
                }
                break;
            case core_2.DISPLAY_TYPE.SELECTION_BOX:
            case core_2.DISPLAY_TYPE.RADIO:
            case core_2.DISPLAY_TYPE.AUTOCOMPLETE_SELECT:
                if (event.value)
                    this.filterChips.push(event.value.value);
                break;
            case core_2.DISPLAY_TYPE.DATE_RANGE:
                //Do we need it?
                break;
            case core_2.DISPLAY_TYPE.NUMBER_RANGE:
                //Do we need it?
                break;
        }
    };
    var _a, _b;
    __decorate([
        core_1.ViewChildren('inputCont'),
        __metadata("design:type", typeof (_a = typeof core_1.QueryList !== "undefined" && core_1.QueryList) === "function" ? _a : Object)
    ], FilterComponent.prototype, "inputContInstances", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], FilterComponent.prototype, "filterItems", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", trackable_screen_1.TrackableScreen)
    ], FilterComponent.prototype, "screen", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FilterComponent.prototype, "webMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], FilterComponent.prototype, "displayCount", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FilterComponent.prototype, "displayMode", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_b = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _b : Object)
    ], FilterComponent.prototype, "selectedFilter", void 0);
    FilterComponent = __decorate([
        core_1.Component({
            selector: 'filter',
            templateUrl: './filter.component.html',
            styleUrls: ['./filter.component.scss']
        }),
        __param(0, core_1.Inject('RunContext')),
        __metadata("design:paramtypes", [rc_browser_1.RunContextBrowser])
    ], FilterComponent);
    return FilterComponent;
}());
exports.FilterComponent = FilterComponent;
//# sourceMappingURL=filter.component.js.map