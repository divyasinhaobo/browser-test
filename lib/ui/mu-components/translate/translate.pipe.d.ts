import { PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service';
export declare class TranslatePipe implements PipeTransform {
    private _translate;
    constructor(_translate: TranslateService);
    transform(value: string, args: string | string[]): any;
}
