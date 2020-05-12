import { Mubble } from '@mubble/core';
import { MuDataTableComponent, TableConfig } from '../ui';
export interface TableDataMgrListener {
    loadMore(lastIndex: number): void;
}
export interface TableDataManagerParams {
    data: Array<Object>;
    lastIndex: number;
}
export declare class TableDataManager {
    private parentInst;
    tableInst: MuDataTableComponent;
    private dataParams;
    private dispRows;
    private totalDataCount;
    private currentKeyIndex;
    private lastKeyIndex;
    private pendingRequest;
    private dataObject;
    constructor(parentInst: TableDataMgrListener, tableInst: MuDataTableComponent);
    /**
    * Method to get the table config and get the dispRows and totalDataCount and data
    * @param tableConfig : To set the table config in the data table
    */
    init(tableConfig: TableConfig, lastIndex: number): void;
    /**
    * parent will populate the data, moreAvailable and lastIndex in this method
    * @param params : Updating the params by the parent so  that the data can be populated into the manager
    */
    updateData(params: TableDataManagerParams): void;
    /**
    * mapping the data into the data object
    * @param index : Index to set as key in the data object
    */
    private mapData;
    /**
    * Calls table instance function to set table data
    * (calls TableDataMgrListener's loadMore if data is not present)
    */
    setTableData(index?: number): void;
    /**
    * Call from parent, clears all the data inside the manager
    */
    clearData(): void;
    /**
    * Method to update the data if parent wants to change any particular data in the data table
    * @param data : data on which the action should be done
    * @param index : index where the data is present
    */
    updateDataStatus(data: Mubble.uObject<any>, index: number): void;
    /**
    * Method called by parent when error occur in parent
    */
    errorOccur(): void;
    /**
    * Method called by parent
    * user selects different data in the data table to pass whether the data should be selectable or not
    * @param data : To select the data in the data table
    */
    setSelectableData(data: Array<Object>): void;
}
