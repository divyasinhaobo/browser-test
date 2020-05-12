import { EventEmitter, OnChanges, ElementRef, QueryList, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TrackableScreen } from '../../router/trackable-screen';
import { RunContextBrowser } from '../../../rc-browser';
import { MatSelectChange, MatDatepickerInputEvent, MatAutocompleteSelectedEvent, MatDatepicker, MatRadioChange, MatCheckboxChange, MatSlideToggleChange, MatButtonToggleChange } from '@angular/material';
import { Observable } from 'rxjs';
import { FileUploadComponent, UploadedDocParams } from '../file-upload/file-upload.component';
import { DISPLAY_TYPE, DISPLAY_MODE, SelectionBoxParams, MuFormParams } from '@mubble/core';
import { MuFormOutputParams } from '../cmn-inp-cont/cmn-inp-cont-interfaces';
export declare class MuFormContainerComponent implements OnChanges {
    protected rc: RunContextBrowser;
    private formBuilder;
    private changeRef;
    picker: MatDatepicker<any>;
    fileUplInst: FileUploadComponent;
    inputCont: QueryList<ElementRef>;
    formParams: MuFormParams;
    screen: TrackableScreen;
    webMode: boolean;
    parentCont: ElementRef;
    eventPropagate: boolean;
    displayMode: DISPLAY_MODE;
    displayLabel: boolean;
    value: EventEmitter<MuFormOutputParams>;
    dropdownOpen: EventEmitter<boolean>;
    lastInpField: EventEmitter<any>;
    inputForm: FormGroup;
    filteredOptions: Observable<SelectionBoxParams[]>;
    DISPLAY_TYPE: typeof DISPLAY_TYPE;
    DISPLAY_MODE: typeof DISPLAY_MODE;
    inputContainers: HTMLElement[];
    private fileUploadParams;
    private subscriber;
    constructor(rc: RunContextBrowser, formBuilder: FormBuilder, changeRef: ChangeDetectorRef);
    ngOnChanges(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    onSubmit(): void;
    isCalanderOpen(): boolean;
    closeCalander(): void;
    selectedOption(event: MatSelectChange | MatRadioChange, i: number): void;
    onToggleChane(event: MatSlideToggleChange, i: number): void;
    onBtnToggleChange(event: MatButtonToggleChange, i: number): void;
    fileUploadValue(event: UploadedDocParams): void;
    checkedOption(event: MatCheckboxChange, option: SelectionBoxParams, i: number): void;
    setChangedValues(event: string, i: number): void;
    setDate(event: MatDatepickerInputEvent<Date>, i: number): void;
    setDateRange(event: MatDatepickerInputEvent<Date>, i: number): void;
    setNumberRange(event: string, i: number): void;
    setAutocompleteValue(event: MatAutocompleteSelectedEvent, i: number): void;
    displayFn(value: any): string;
    hasError(): boolean;
    dropDownToggle(event: boolean, index: number): void;
    valueEntered(value: any, i: number): void;
    enterOnLastInput(event: any): void;
    private initialize;
    private filterOptions;
    private setDisabled;
    private isDateObj;
    focusElement(index: number): void;
}
