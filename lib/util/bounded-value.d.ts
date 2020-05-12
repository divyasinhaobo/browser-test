export declare class BoundedValue {
    value: number;
    private elemDirUp;
    private contDirUp;
    private elemLow;
    private elemHigh;
    private contLow;
    private contHigh;
    constructor(initState: number, finalState: number, contInitState: number, contFinalState: number);
    compute(contValue: any): boolean;
    getDecimalValue(digitsAfterDecimal?: number): number;
    isCloserToInit(): boolean;
}
