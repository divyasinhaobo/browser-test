import { AbstractControl, FormControl } from '@angular/forms';
export declare class InputValidator {
    static dateValidator(control: AbstractControl): null | undefined;
    static futureDateValidatorIfAllowed(control: AbstractControl): void;
    static amountValidator(control: AbstractControl): null | undefined;
    static futureDateValidator(control: FormControl): {
        futureDate: boolean;
    } | null;
}
