"use strict";
/*------------------------------------------------------------------------------
   About      : Class to manage the data of the mu-data table durig lazy load
   
   Created on : Thu Nov 07 2019
   Author     : Pulkit Chaturvedi
   
   Copyright (c) 2019 Obopay. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
var TableDataManager = /** @class */ (function () {
    function TableDataManager(parentInst, tableInst) {
        this.parentInst = parentInst;
        this.tableInst = tableInst;
        this.dataParams = {};
        this.currentKeyIndex = 0;
        this.dataObject = {};
    }
    /**
    * Method to get the table config and get the dispRows and totalDataCount and data
    * @param tableConfig : To set the table config in the data table
    */
    TableDataManager.prototype.init = function (tableConfig, lastIndex) {
        this.dataParams.data = [];
        this.dispRows = tableConfig.dispRows || 0;
        this.totalDataCount = tableConfig.totalRecords || 0;
        var params = {
            lastIndex: lastIndex,
            data: tableConfig.data
        };
        var data = tableConfig.data.slice(0, this.dispRows);
        tableConfig.data = data;
        // this.tableInst.setTableConfig(tableConfig)
        this.updateData(params);
    };
    /**
    * parent will populate the data, moreAvailable and lastIndex in this method
    * @param params : Updating the params by the parent so  that the data can be populated into the manager
    */
    TableDataManager.prototype.updateData = function (params) {
        this.dataParams.data = params.data;
        this.dataParams.lastIndex = params.lastIndex;
        this.mapData(0);
    };
    /**
    * mapping the data into the data object
    * @param index : Index to set as key in the data object
    */
    TableDataManager.prototype.mapData = function (index) {
        var addingIndex = this.currentKeyIndex;
        while (addingIndex < this.dataParams.lastIndex) {
            if (this.dataObject[addingIndex] && this.dataObject[addingIndex].length === this.dispRows) {
                addingIndex += this.dispRows;
                continue;
            }
            this.dataObject[addingIndex] = this.dataParams.data.slice(index, (this.dispRows + index));
            index += this.dispRows;
            addingIndex += this.dispRows;
        }
        if (this.pendingRequest)
            this.setTableData();
    };
    /**
    * Calls table instance function to set table data
    * (calls TableDataMgrListener's loadMore if data is not present)
    */
    TableDataManager.prototype.setTableData = function (index) {
        var _this = this;
        if (index >= 0)
            this.currentKeyIndex = index;
        var keys = Object.keys(this.dataObject);
        var dataKey = keys.find(function (key) {
            return Number(key) === _this.currentKeyIndex;
        });
        if (dataKey) {
            var data = this.dataObject[dataKey];
            if (data.length === this.dispRows || (this.totalDataCount - this.currentKeyIndex) < this.dispRows) {
                // this.tableInst.setDisplayData(data)
                this.lastKeyIndex = Number(dataKey);
            }
            else {
                var index_1 = this.currentKeyIndex + data.length;
                this.parentInst.loadMore(index_1);
                this.pendingRequest = true;
            }
            return;
        }
        this.parentInst.loadMore(this.currentKeyIndex);
        this.pendingRequest = true;
    };
    /**
    * Call from parent, clears all the data inside the manager
    */
    TableDataManager.prototype.clearData = function () {
        this.totalDataCount = 0;
        this.dispRows = 0;
        this.currentKeyIndex = 0;
        this.dataParams = {};
        this.dataObject = {};
        this.pendingRequest = false;
    };
    /**
    * Method to update the data if parent wants to change any particular data in the data table
    * @param data : data on which the action should be done
    * @param index : index where the data is present
    */
    TableDataManager.prototype.updateDataStatus = function (data, index) {
        var dataIndex = index - this.currentKeyIndex;
        this.dataObject[this.currentKeyIndex][dataIndex] = data;
        this.setTableData();
    };
    /**
    * Method called by parent when error occur in parent
    */
    TableDataManager.prototype.errorOccur = function () {
        this.pendingRequest = false;
        this.currentKeyIndex = this.lastKeyIndex;
        // this.tableInst.onUiError()
        this.setTableData();
    };
    /**
    * Method called by parent
    * user selects different data in the data table to pass whether the data should be selectable or not
    * @param data : To select the data in the data table
    */
    TableDataManager.prototype.setSelectableData = function (data) {
        // this.tableInst.setSelectedItems(data)
    };
    return TableDataManager;
}());
exports.TableDataManager = TableDataManager;
//# sourceMappingURL=table-data-manager.js.map