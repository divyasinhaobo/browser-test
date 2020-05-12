import { TranslateService } from '..';
import { RunContextBrowser } from '@mubble/browser/rc-browser';
import { MatDatepicker } from '@angular/material/datepicker';
export declare enum FILTER_TYPE {
    DATE = 0,
    DATE_RANGE = 1,
    DROP_DOWN = 2,
    NUMBER = 3,
    NUMBER_RANGE = 4,
    TEXT = 5
}
export interface FilterItem {
    id: string;
    label: string;
    type: FILTER_TYPE;
    value?: string[];
}
export interface SelectedFilter {
    id: string;
    value: string[] | number[] | string | number;
}
export declare class FilterTransComponent {
    protected rc: RunContextBrowser;
    private translate;
    startPicker: MatDatepicker<Date>;
    endPicker: MatDatepicker<Date>;
    picker: MatDatepicker<Date>;
    filterItems: FilterItem[];
    selectedFilter: any;
    FILTER_TYPE: typeof FILTER_TYPE;
    startDate: any;
    endDate: any;
    minAmount: any;
    maxAmount: any;
    textSearch: string;
    dropDownOpt: string;
    filters: SelectedFilter[];
    constructor(rc: RunContextBrowser, translate: TranslateService);
    ngOnInit(): void;
    applyFilters(): void;
    setChangedValue(event: any, fItem: FilterItem): void;
    private hasError;
}
