"use strict";
/*------------------------------------------------------------------------------
   About      : Generic component for filtering transactions which can either be
                date, date-range, dropdown list, number, number-range or text
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
var __1 = require("..");
var rc_browser_1 = require("@mubble/browser/rc-browser");
var datepicker_1 = require("@angular/material/datepicker");
var framework_1 = require("framework");
var forms_1 = require("@angular/forms");
var FILTER_TYPE;
(function (FILTER_TYPE) {
    FILTER_TYPE[FILTER_TYPE["DATE"] = 0] = "DATE";
    FILTER_TYPE[FILTER_TYPE["DATE_RANGE"] = 1] = "DATE_RANGE";
    FILTER_TYPE[FILTER_TYPE["DROP_DOWN"] = 2] = "DROP_DOWN";
    FILTER_TYPE[FILTER_TYPE["NUMBER"] = 3] = "NUMBER";
    FILTER_TYPE[FILTER_TYPE["NUMBER_RANGE"] = 4] = "NUMBER_RANGE";
    FILTER_TYPE[FILTER_TYPE["TEXT"] = 5] = "TEXT";
})(FILTER_TYPE = exports.FILTER_TYPE || (exports.FILTER_TYPE = {}));
var FilterTransComponent = /** @class */ (function () {
    function FilterTransComponent(rc, translate) {
        this.rc = rc;
        this.translate = translate;
        this.filterItems = [];
        this.selectedFilter = new core_1.EventEmitter();
        this.FILTER_TYPE = FILTER_TYPE;
        this.startDate = new forms_1.FormControl();
        this.endDate = new forms_1.FormControl();
        this.minAmount = new forms_1.FormControl();
        this.maxAmount = new forms_1.FormControl();
        this.textSearch = '';
        this.filters = [];
        rc.setupLogger(this, 'FilterTrans', framework_1.LOG_LEVEL.DEBUG);
    }
    FilterTransComponent.prototype.ngOnInit = function () {
        for (var _i = 0, _a = this.filterItems; _i < _a.length; _i++) {
            var fItem = _a[_i];
            this.filters.push({ id: fItem.id, value: undefined });
        }
    };
    /*=====================================================================
                                HTML
    =====================================================================*/
    FilterTransComponent.prototype.applyFilters = function () {
        if (this.hasError()) {
            return;
        }
        this.selectedFilter.emit(this.filters);
    };
    FilterTransComponent.prototype.setChangedValue = function (event, fItem) {
        var index = this.filters.findIndex(function (x) { return x.id === fItem.id; });
        switch (fItem.type) {
            case FILTER_TYPE.DATE:
                this.filters[index].value = event.value.unix();
                break;
            case FILTER_TYPE.DROP_DOWN:
                this.dropDownOpt = event.value;
                this.filters[index].value = this.dropDownOpt;
                break;
            case FILTER_TYPE.NUMBER:
                this.filters[index].value = event.target.value + '';
                break;
            case FILTER_TYPE.TEXT:
                this.textSearch = event.target.value + '';
                this.filters[index].value = this.textSearch;
                break;
            case FILTER_TYPE.DATE_RANGE:
                var startDate = this.startDate.value ? this.startDate.value.unix() : undefined, endDate = this.endDate.value ? this.endDate.value.unix() : undefined;
                this.filters[index].value = [startDate, endDate];
                break;
            case FILTER_TYPE.NUMBER_RANGE:
                var minAmount = this.minAmount.value ? this.minAmount.value : undefined, maxAmount = this.maxAmount.value ? this.maxAmount.value : undefined;
                this.filters[index].value = [minAmount, maxAmount];
                break;
        }
    };
    /*=====================================================================
                              PRIVATE
    =====================================================================*/
    FilterTransComponent.prototype.hasError = function () {
        if (this.startDate.value && this.endDate.value && (this.startDate.value > this.endDate.value)) {
            return true;
        }
        if (this.endDate.value && !this.startDate.value) {
            return true;
        }
        if (this.minAmount.value && this.maxAmount.value && (this.minAmount.value > this.maxAmount.value)) {
            return true;
        }
        if (this.maxAmount.value && !this.minAmount.value) {
            return true;
        }
        return false;
    };
    var _a, _b, _c, _d;
    __decorate([
        core_1.ViewChild(datepicker_1.MatDatepicker, { static: false }),
        __metadata("design:type", typeof (_a = typeof datepicker_1.MatDatepicker !== "undefined" && datepicker_1.MatDatepicker) === "function" ? _a : Object)
    ], FilterTransComponent.prototype, "startPicker", void 0);
    __decorate([
        core_1.ViewChild(datepicker_1.MatDatepicker, { static: false }),
        __metadata("design:type", typeof (_b = typeof datepicker_1.MatDatepicker !== "undefined" && datepicker_1.MatDatepicker) === "function" ? _b : Object)
    ], FilterTransComponent.prototype, "endPicker", void 0);
    __decorate([
        core_1.ViewChild(datepicker_1.MatDatepicker, { static: false }),
        __metadata("design:type", typeof (_c = typeof datepicker_1.MatDatepicker !== "undefined" && datepicker_1.MatDatepicker) === "function" ? _c : Object)
    ], FilterTransComponent.prototype, "picker", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], FilterTransComponent.prototype, "filterItems", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FilterTransComponent.prototype, "selectedFilter", void 0);
    FilterTransComponent = __decorate([
        core_1.Component({
            selector: 'filter-trans',
            templateUrl: './filter-trans.component.html',
            styleUrls: ['./filter-trans.component.scss']
        }),
        __param(0, core_1.Inject('RunContext')),
        __metadata("design:paramtypes", [typeof (_d = typeof rc_browser_1.RunContextBrowser !== "undefined" && rc_browser_1.RunContextBrowser) === "function" ? _d : Object, __1.TranslateService])
    ], FilterTransComponent);
    return FilterTransComponent;
}());
exports.FilterTransComponent = FilterTransComponent;
//# sourceMappingURL=filter-trans.component.js.map