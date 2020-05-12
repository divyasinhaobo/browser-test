"use strict";
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
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var app_server_interfaces_1 = require("@mubble/core/interfaces/app-server-interfaces");
var rc_browser_1 = require("@mubble/browser/rc-browser");
var core_2 = require("@mubble/core");
var MuDataTableComponent = /** @class */ (function () {
    function MuDataTableComponent(rc, changeDet) {
        this.rc = rc;
        this.changeDet = changeDet;
        this.loadMoreData = new core_1.EventEmitter();
        this.onRowSelect = new core_1.EventEmitter();
        this.onSelectAll = new core_1.EventEmitter();
        this.onDetailClick = new core_1.EventEmitter();
        this.onCellClick = new core_1.EventEmitter();
        this.onRowEdit = new core_1.EventEmitter();
        this.selectedFilter = new core_1.EventEmitter();
        this.selectedIndexes = {};
        this.selAllMap = {};
        this.headerFields = [];
        this.dataToDisplay = [];
        this.pageNumbers = [];
        this.filterFields = [];
        this.dataMap = {};
        this.editForm = new forms_1.FormGroup({});
        this.COL_TYPE = core_2.COL_TYPE;
        this.DISPLAY_MODE = app_server_interfaces_1.DISPLAY_MODE;
        if (rc.getLogLevel() === core_2.LOG_LEVEL.DEBUG)
            window['datatable'] = this;
    }
    MuDataTableComponent.prototype.ngOnChanges = function (changes) {
        this.tableConfig = changes['tableConfig'].currentValue;
        this.setUpTable();
    };
    MuDataTableComponent.prototype.ngOnInit = function () {
        this.setUpTable();
    };
    MuDataTableComponent.prototype.ngAfterViewInit = function () {
        var top = this.filterCont.nativeElement.offsetTop;
        this.filterCont.nativeElement.style.maxHeight = "calc(100% - " + top + "px)";
    };
    /*=====================================================================
                                PRIVATE
    =====================================================================*/
    MuDataTableComponent.prototype.setUpTable = function () {
        var _this = this;
        if (this.tableConfig) {
            for (var _i = 0, _a = this.tableConfig.headers; _i < _a.length; _i++) {
                var header = _a[_i];
                if (header.colType === core_2.COL_TYPE.TOGGLE)
                    this.isTogglePresent = true;
                if (header.isEditable)
                    this.editForm.addControl(header.dataKey, new forms_1.FormControl());
                this.headerFields.push(header.dataKey);
                if (this.tableConfig.enableFilter &&
                    (header.colType === core_2.COL_TYPE.HYPER_LINK ||
                        header.colType === core_2.COL_TYPE.TEXT)) {
                    this.filterFields.push(header.dataKey);
                }
            }
            if (this.tableConfig.selectedIndexes)
                this.tableConfig.selectedIndexes.map(function (index) { return _this.selectedIndexes[index] = true; });
            this.tableConfig.totalRecords = this.tableConfig.totalRecords || this.tableConfig.data.length;
            this.tableConfig.dispRows = this.tableConfig.dispRows || this.tableConfig.data.length;
            this.createDataMap(this.tableConfig.data, 0);
            this.createPageNumbers();
        }
    };
    /**
     * Creates the page numbers needed for pagination
     * Called during initialization of table and updation of data inside table
     */
    MuDataTableComponent.prototype.createPageNumbers = function () {
        this.pageNumbers = [];
        this.currPageIndex = this.prevPageIndex = this.pageIndex = 0;
        var totalPages = this.tableConfig.totalRecords / this.tableConfig.dispRows;
        if (this.tableConfig.totalRecords % this.tableConfig.dispRows)
            totalPages++;
        for (var pageNumber = 1; pageNumber <= totalPages; pageNumber++)
            this.pageNumbers.push(pageNumber);
    };
    /**
     * changes the pagenumbers according to the current selected page number
     * @param pageIndex
     */
    MuDataTableComponent.prototype.updatePageNumbers = function (pageIndex) {
        this.pageIndex = pageIndex - 2;
        if (this.pageIndex <= 0)
            this.pageIndex = 0;
        if (this.pageIndex >= (this.pageNumbers.length - 4))
            this.pageIndex = this.pageNumbers.length - 5;
    };
    /**
     * sends a callback to parent with main event and row data on click of radio button, checkbox or
     * toggle button so that parent can stop the default action
     * @param event
     * @param rowData
     */
    MuDataTableComponent.prototype.rowClick = function (event, rowData) {
        var selEvent = {
            rowData: rowData,
            rowIndex: rowData['rowIndex'],
            isSelected: this.selectedIndexes[rowData['rowIndex']] ? false : true,
            browserEvent: event
        };
        this.onRowSelect.emit(selEvent);
    };
    /**
     * Changes the select all indexes map according to user preference on click of checkbox
     * @param event
     * @param rowData
     */
    MuDataTableComponent.prototype.rowSelect = function (event, rowData) {
        if (event.checked) {
            this.selectedIndexes[rowData['rowIndex']] = true;
        }
        else {
            this.slctAllBox.checked = false;
            this.selAllMap[this.currPageIndex] = false;
            this.selectedIndexes[rowData['rowIndex']] = false;
        }
    };
    /**
     * Selects all the rows in the page that is being displayed and a callback is
     * sent to the parent with the rows that are selected.
     */
    MuDataTableComponent.prototype.selectAll = function (event) {
        this.slctAllBox.checked = event.checked;
        this.selAllMap[this.currPageIndex] = event.checked;
        for (var index = 0; index < (this.currPageIndex + this.tableConfig.dispRows); index++)
            this.selectedIndexes[index + (this.currPageIndex * this.tableConfig.dispRows)] = event.checked;
        var selAllEvent = {
            selectedRows: this.dataMap[this.currPageIndex],
            isSelected: event.checked
        };
        this.onSelectAll.emit(selAllEvent);
    };
    /**
     * Changes the select all indexes map according to user preference on click of radio button
     * @param event
     * @param rowData
     */
    MuDataTableComponent.prototype.radioSelect = function (event, rowData) {
        this.selectedIndexes = {};
        var selectedIndex = rowData['rowIndex'];
        this.selectedIndexes[selectedIndex] = true;
    };
    /**
     * Sends call back to the parent on click of an option inside moredetails along with
     * the ID of the option and rowData
     * @param detKey
     * @param rowData
     */
    MuDataTableComponent.prototype.moreDetailsClick = function (detKey, rowData) {
        var moreSelEvent = {
            id: detKey,
            rowData: rowData
        };
        this.onDetailClick.emit(moreSelEvent);
    };
    /**
     * Changes the select all indexes map according to user preference on click of toggle button
     * @param event
     * @param rowData
     */
    MuDataTableComponent.prototype.toggleRow = function (event, rowData) {
        this.selectedIndexes[rowData['rowIndex']] = event.checked;
    };
    /**
     * mapData creates a map of row objects that needs to be displayed in the table
     * with index as the key and array of objects as its value
     * @param data the data that needs to be mapped
     * @param startPageIndex - index from which data needs to be mapped
     */
    MuDataTableComponent.prototype.createDataMap = function (data, startPageIndex) {
        var dataSetCount = Math.ceil(data.length / this.tableConfig.dispRows), currData = JSON.parse(JSON.stringify(data));
        for (var index = 0; index < currData.length; index++)
            currData[index]['rowIndex'] = index + (startPageIndex * this.tableConfig.dispRows);
        for (var i = 0; i < dataSetCount; i++) {
            var mapData = currData.splice(0, this.tableConfig.dispRows), mapKey = startPageIndex + i;
            if (mapData.length === this.tableConfig.dispRows
                || !this.tableConfig.lazyLoad
                || (this.tableConfig.lazyLoad && this.tableConfig.totalRecords <= ((mapKey * this.tableConfig.dispRows) + mapData.length)))
                this.dataMap[mapKey] = mapData;
        }
        this.dataToDisplay = this.dataMap[startPageIndex] || [];
        this.changeDet.detectChanges();
    };
    /**
     * Called when user clicked on a page with its index as parameter.
     * Displays the data of that index from the data map, if the data does not exists,
     * a callback is given to the parent to load more data.
     * @param pageIndex
     */
    MuDataTableComponent.prototype.onPageClick = function (pageIndex) {
        if (pageIndex >= this.pageNumbers.length) {
            pageIndex = this.pageNumbers.length - 1;
        }
        else if (pageIndex < 0) {
            pageIndex = 0;
        }
        this.prevPageIndex = this.currPageIndex;
        this.currPageIndex = pageIndex;
        if (this.slctAllBox) {
            this.slctAllBox.checked = this.selAllMap[this.currPageIndex] || false;
        }
        //Handling page numbers change
        if (this.pageNumbers.length > 5)
            this.updatePageNumbers(pageIndex);
        //Handling data change
        if (this.dataMap[this.currPageIndex]) {
            this.dataToDisplay = this.dataMap[pageIndex];
        }
        else {
            this.loadMoreData.emit(pageIndex * this.tableConfig.dispRows);
        }
    };
    /**
     * Updates the table data with new data, an optional parameter currentIndex should
     * be sent as '0' inorder to clear the refresh the table.
     * @param data
     * @param currentIndex
     */
    MuDataTableComponent.prototype.updateData = function (data, currentIndex) {
        if (currentIndex === 0) {
            this.currPageIndex = currentIndex;
            this.dataMap = {};
            this.createPageNumbers();
        }
        if (!this.tableConfig.lazyLoad)
            this.tableConfig.totalRecords = data.length;
        this.createDataMap(data, this.currPageIndex);
    };
    /**
     * Method invoked by the parent in case of api loading failure which brings back
     * the table to previous state
     */
    MuDataTableComponent.prototype.loadingFailed = function () {
        this.currPageIndex = this.prevPageIndex;
        this.updatePageNumbers(this.currPageIndex);
    };
    /**
     * Sends callback to the parent when the user clicks on hyperlink
     * @param rowData
     * @param headerKey
     */
    MuDataTableComponent.prototype.cellClick = function (rowData, headerKey) {
        var buttonEvent = {
            headerKey: headerKey,
            rowData: rowData,
            rowIndex: rowData['rowIndex']
        };
        this.onCellClick.emit(buttonEvent);
    };
    /**
     * performs search operation on the data available in the table only if table
     * is not lazy loaded. In case of lazy loading a callback is given to parent.
     * @param event
     */
    MuDataTableComponent.prototype.search = function (inputText) {
        var _this = this;
        this.dataMap = {};
        var filteredData = [];
        if (!inputText) {
            filteredData = this.tableConfig.data;
        }
        else {
            filteredData = this.tableConfig.data.filter(function (dataRow) {
                if (_this.filterFields.filter(function (header) { return dataRow[header] && dataRow[header].toString().toLowerCase()
                    .includes(inputText.toString().toLowerCase()); })
                    .length)
                    return true;
            });
        }
        this.tableConfig.totalRecords = filteredData.length;
        this.createDataMap(filteredData, 0);
        this.createPageNumbers();
    };
    /**
     * Inserts a data row at the beginning of the table by clearing the datamap
     * @param obj - data object that needs to be inserted
     */
    MuDataTableComponent.prototype.insertRow = function (obj) {
        var newData = [];
        if (!this.tableConfig.lazyLoad) {
            this.tableConfig.data.unshift(obj);
            newData = this.tableConfig.data;
            //Need to verify
            var newIndexes = {};
            for (var _i = 0, _a = Object.keys(this.selectedIndexes); _i < _a.length; _i++) {
                var index = _a[_i];
                newIndexes[Number(index) + 1] = true;
            }
            this.selectedIndexes = {};
            this.selectedIndexes = newIndexes;
        }
        else {
            var firstPageData = this.dataMap[0];
            firstPageData.unshift(obj);
            firstPageData.pop();
            newData = firstPageData;
        }
        this.dataMap = {};
        this.tableConfig.totalRecords++;
        this.createDataMap(newData, 0);
        this.createPageNumbers();
    };
    /**
     * Deletes a row of given row index assuming that the index which is to deleted is currently
     * being displayed. Checks whether next page data exists in the map and reorders the sequence by
     * shifting the data, if not a callback is sent to parent to load data for that index.
     * @param rowIndex - index of the data which needs to be deleted
     */
    MuDataTableComponent.prototype.deleteRow = function (rowIndex) {
        if (!this.tableConfig.lazyLoad) {
            this.tableConfig.data.splice(rowIndex, 1);
            this.dataMap = {};
            this.createDataMap(this.tableConfig.data, 0);
            this.tableConfig.totalRecords--;
            this.createPageNumbers();
            //Need to verify
            var newIndexes = {};
            for (var _i = 0, _a = Object.keys(this.selectedIndexes); _i < _a.length; _i++) {
                var index = _a[_i];
                newIndexes[Number(index) - 1] = true;
            }
            this.selectedIndexes = {};
            this.selectedIndexes = newIndexes;
            return;
        }
        if (this.dataMap[this.currPageIndex + 1]) {
            this.dataMap[this.currPageIndex].splice(rowIndex % this.tableConfig.dispRows, 1);
            this.dataMap[this.currPageIndex].push(this.dataMap[this.currPageIndex + 1][0]);
        }
        else if (this.tableConfig.totalRecords <= this.tableConfig.dispRows) {
            this.tableConfig.totalRecords--;
            this.dataMap[this.currPageIndex].splice(rowIndex % this.tableConfig.dispRows, 1);
        }
        else {
            this.loadMoreData.emit(this.currPageIndex * this.tableConfig.dispRows);
        }
        if (this.tableConfig.enableSelect)
            this.selectedIndexes = {};
        var keys = Object.keys(this.dataMap);
        for (var _b = 0, keys_1 = keys; _b < keys_1.length; _b++) {
            var key = keys_1[_b];
            if (Number(key) > this.currPageIndex)
                delete this.dataMap[key];
        }
        this.changeDet.detectChanges();
    };
    /**
     * Enables editing the data for editable coloumns when the user clicks on edit button.
     * Sends callback to the parent with new values when user saves the data.
     */
    MuDataTableComponent.prototype.editRow = function (rowData, isEdit) {
        this.selectedIndexes = {};
        if (isEdit) {
            this.selectedIndexes[rowData['rowIndex']] = true;
        }
        else {
            var editEvent = {
                editedValues: this.editForm.value,
                rowData: rowData,
                rowIndex: rowData['rowIndex']
            };
            this.onRowEdit.emit(editEvent);
        }
        this.editForm.reset();
    };
    /**
     * updates the data of given rowIndex, usually called after editing the data.
     * @param rowIndex
     * @param data
     */
    MuDataTableComponent.prototype.updateRow = function (rowIndex, data) {
        this.dataMap[this.currPageIndex][rowIndex % this.tableConfig.dispRows] = data;
    };
    /**
     * Call back from filter component on applying filters that was directly passed
     * back to the parent
     * @param event
     */
    MuDataTableComponent.prototype.applyFilter = function (event) {
        /*
        If data table has all the data, filters are applied by the table itself
        instead of making an api call
        */
        if (!this.tableConfig.lazyLoad) {
            if (event && event[0])
                this.search(event[0].value.toString());
            else
                this.search();
            return;
        }
        this.changeDet.detectChanges();
        this.selectedFilter.emit(event);
    };
    /**
     * Method invoked by parent to unselect the rows
     * @param rowIndexes
     */
    MuDataTableComponent.prototype.unselectIndexes = function (rowIndexes) {
        for (var _i = 0, rowIndexes_1 = rowIndexes; _i < rowIndexes_1.length; _i++) {
            var index = rowIndexes_1[_i];
            this.selectedIndexes[index] = false;
        }
        if (this.slctAllBox)
            this.slctAllBox.checked = false;
        this.selAllMap[this.currPageIndex] = false;
    };
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    __decorate([
        core_1.ViewChild('slctAllBox', { static: false }),
        __metadata("design:type", typeof (_a = typeof material_1.MatCheckbox !== "undefined" && material_1.MatCheckbox) === "function" ? _a : Object)
    ], MuDataTableComponent.prototype, "slctAllBox", void 0);
    __decorate([
        core_1.ViewChild('filterCont', { static: false }),
        __metadata("design:type", typeof (_b = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _b : Object)
    ], MuDataTableComponent.prototype, "filterCont", void 0);
    __decorate([
        core_1.ViewChild('muTableCont', { static: false }),
        __metadata("design:type", typeof (_c = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _c : Object)
    ], MuDataTableComponent.prototype, "muTableCont", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MuDataTableComponent.prototype, "tableConfig", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_d = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _d : Object)
    ], MuDataTableComponent.prototype, "loadMoreData", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_e = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _e : Object)
    ], MuDataTableComponent.prototype, "onRowSelect", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_f = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _f : Object)
    ], MuDataTableComponent.prototype, "onSelectAll", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_g = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _g : Object)
    ], MuDataTableComponent.prototype, "onDetailClick", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_h = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _h : Object)
    ], MuDataTableComponent.prototype, "onCellClick", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_j = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _j : Object)
    ], MuDataTableComponent.prototype, "onRowEdit", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_k = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _k : Object)
    ], MuDataTableComponent.prototype, "selectedFilter", void 0);
    MuDataTableComponent = __decorate([
        core_1.Component({
            selector: 'mu-data-table',
            templateUrl: './mu-data-table.component.html',
            styleUrls: ['./mu-data-table.component.scss']
        }),
        __param(0, core_1.Inject('RunContext')),
        __metadata("design:paramtypes", [typeof (_l = typeof rc_browser_1.RunContextBrowser !== "undefined" && rc_browser_1.RunContextBrowser) === "function" ? _l : Object, typeof (_m = typeof core_1.ChangeDetectorRef !== "undefined" && core_1.ChangeDetectorRef) === "function" ? _m : Object])
    ], MuDataTableComponent);
    return MuDataTableComponent;
}());
exports.MuDataTableComponent = MuDataTableComponent;
//# sourceMappingURL=mu-data-table.component.js.map