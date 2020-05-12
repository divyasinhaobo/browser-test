import { InputContainerComponent } from '..';
import { QueryList, EventEmitter } from '@angular/core';
import { TrackableScreen } from '../../../ui/router/trackable-screen';
import { RunContextBrowser } from '../../../rc-browser';
import { DISPLAY_MODE, FilterItem, SelectionBoxParams, FILTER_MODE } from '@mubble/core';
import { OutputParams } from '../cmn-inp-cont';
export interface DateRangeInterface {
    startDate: number;
    endDate?: number;
}
export interface NumberRangeInterface {
    minAmount: number;
    maxAmount?: number;
}
export interface SelectedFilter {
    id: string;
    mode: FILTER_MODE;
    value: DateRangeInterface | NumberRangeInterface | string | number | SelectionBoxParams;
}
export declare class FilterComponent {
    protected rc: RunContextBrowser;
    inputContInstances: QueryList<InputContainerComponent>;
    filterItems: FilterItem[];
    screen: TrackableScreen;
    webMode: boolean;
    displayCount: number;
    displayMode: DISPLAY_MODE;
    selectedFilter: EventEmitter<SelectedFilter[]>;
    filters: SelectedFilter[];
    DISPLAY_MODE: typeof DISPLAY_MODE;
    filterChips: string[];
    constructor(rc: RunContextBrowser);
    ngOnInit(): void;
    applyFilters(): void;
    clearFilters(): void;
    setFilterItems(event: OutputParams): void;
    private hasError;
    private valueChanged;
    private initialize;
    private setFilterChips;
}
