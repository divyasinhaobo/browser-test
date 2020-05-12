import { OnInit, EventEmitter, ElementRef, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { MatCheckboxChange, MatRadioChange, MatSlideToggleChange, MatCheckbox } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { TableHeader, FilterItem, DISPLAY_MODE } from '@mubble/core/interfaces/app-server-interfaces';
import { RunContextBrowser } from '@mubble/browser/rc-browser';
import { COL_TYPE } from '@mubble/core';
import { SelectedFilter } from '../filter';
export interface TableConfig {
    headers: TableHeader[];
    data: Array<Object>;
    dispRows?: number;
    enableSelect?: boolean;
    enableRadio?: boolean;
    enableFilter?: boolean;
    selectedIndexes?: number[];
    lazyLoad?: boolean;
    totalRecords?: number;
    horizFilterParams?: FilterItem[];
    vertFilterParams?: FilterItem[];
}
export interface MuTableRowSelEvent {
    rowIndex: number;
    rowData: Object;
    isSelected: boolean;
    browserEvent: any;
}
export interface MuTableDetailEvent {
    id: string;
    rowData: Object;
}
export interface MuTableSelAllEvent {
    selectedRows: Object[];
    isSelected: boolean;
}
export interface MuTableClickEvent {
    rowIndex: number;
    rowData: Object;
    headerKey: string;
}
export interface MuTableMoreDetail {
    id: string;
    value: string;
}
export interface MuTableEditEvent {
    rowIndex: number;
    rowData: Object;
    editedValues: Object;
}
export declare class MuDataTableComponent implements OnInit {
    protected rc: RunContextBrowser;
    private changeDet;
    slctAllBox: MatCheckbox;
    filterCont: ElementRef;
    muTableCont: ElementRef;
    tableConfig: TableConfig;
    loadMoreData: EventEmitter<number>;
    onRowSelect: EventEmitter<MuTableRowSelEvent>;
    onSelectAll: EventEmitter<MuTableSelAllEvent>;
    onDetailClick: EventEmitter<MuTableDetailEvent>;
    onCellClick: EventEmitter<MuTableClickEvent>;
    onRowEdit: EventEmitter<MuTableEditEvent>;
    selectedFilter: EventEmitter<SelectedFilter[]>;
    pageIndex: number;
    currPageIndex: number;
    prevPageIndex: number;
    isTogglePresent: boolean;
    selectedIndexes: Object;
    selAllMap: Object;
    headerFields: string[];
    dataToDisplay: Object[];
    pageNumbers: number[];
    private filterFields;
    private dataMap;
    editForm: FormGroup;
    COL_TYPE: typeof COL_TYPE;
    DISPLAY_MODE: typeof DISPLAY_MODE;
    constructor(rc: RunContextBrowser, changeDet: ChangeDetectorRef);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    private setUpTable;
    /**
     * Creates the page numbers needed for pagination
     * Called during initialization of table and updation of data inside table
     */
    private createPageNumbers;
    /**
     * changes the pagenumbers according to the current selected page number
     * @param pageIndex
     */
    private updatePageNumbers;
    /**
     * sends a callback to parent with main event and row data on click of radio button, checkbox or
     * toggle button so that parent can stop the default action
     * @param event
     * @param rowData
     */
    rowClick(event: any, rowData: any): void;
    /**
     * Changes the select all indexes map according to user preference on click of checkbox
     * @param event
     * @param rowData
     */
    rowSelect(event: MatCheckboxChange, rowData: any): void;
    /**
     * Selects all the rows in the page that is being displayed and a callback is
     * sent to the parent with the rows that are selected.
     */
    selectAll(event: MatCheckboxChange): void;
    /**
     * Changes the select all indexes map according to user preference on click of radio button
     * @param event
     * @param rowData
     */
    radioSelect(event: MatRadioChange, rowData: Object): void;
    /**
     * Sends call back to the parent on click of an option inside moredetails along with
     * the ID of the option and rowData
     * @param detKey
     * @param rowData
     */
    moreDetailsClick(detKey: string, rowData: Object): void;
    /**
     * Changes the select all indexes map according to user preference on click of toggle button
     * @param event
     * @param rowData
     */
    toggleRow(event: MatSlideToggleChange, rowData: Object): void;
    /**
     * mapData creates a map of row objects that needs to be displayed in the table
     * with index as the key and array of objects as its value
     * @param data the data that needs to be mapped
     * @param startPageIndex - index from which data needs to be mapped
     */
    createDataMap(data: Array<Object>, startPageIndex: number): void;
    /**
     * Called when user clicked on a page with its index as parameter.
     * Displays the data of that index from the data map, if the data does not exists,
     * a callback is given to the parent to load more data.
     * @param pageIndex
     */
    onPageClick(pageIndex: number): void;
    /**
     * Updates the table data with new data, an optional parameter currentIndex should
     * be sent as '0' inorder to clear the refresh the table.
     * @param data
     * @param currentIndex
     */
    updateData(data: Object[], currentIndex?: number): void;
    /**
     * Method invoked by the parent in case of api loading failure which brings back
     * the table to previous state
     */
    loadingFailed(): void;
    /**
     * Sends callback to the parent when the user clicks on hyperlink
     * @param rowData
     * @param headerKey
     */
    cellClick(rowData: Object, headerKey: string): void;
    /**
     * performs search operation on the data available in the table only if table
     * is not lazy loaded. In case of lazy loading a callback is given to parent.
     * @param event
     */
    search(inputText?: string): void;
    /**
     * Inserts a data row at the beginning of the table by clearing the datamap
     * @param obj - data object that needs to be inserted
     */
    insertRow(obj: Object): void;
    /**
     * Deletes a row of given row index assuming that the index which is to deleted is currently
     * being displayed. Checks whether next page data exists in the map and reorders the sequence by
     * shifting the data, if not a callback is sent to parent to load data for that index.
     * @param rowIndex - index of the data which needs to be deleted
     */
    deleteRow(rowIndex: number): void;
    /**
     * Enables editing the data for editable coloumns when the user clicks on edit button.
     * Sends callback to the parent with new values when user saves the data.
     */
    editRow(rowData: Object, isEdit: boolean): void;
    /**
     * updates the data of given rowIndex, usually called after editing the data.
     * @param rowIndex
     * @param data
     */
    updateRow(rowIndex: number, data: Object): void;
    /**
     * Call back from filter component on applying filters that was directly passed
     * back to the parent
     * @param event
     */
    applyFilter(event: SelectedFilter[]): void;
    /**
     * Method invoked by parent to unselect the rows
     * @param rowIndexes
     */
    unselectIndexes(rowIndexes: number[]): void;
}
