export declare class MultiStepValue {
    private minVal;
    private viewSize;
    private count;
    private applyTol?;
    private quickMove?;
    currentIndex: number;
    currentValue: number;
    private maxVal;
    private tolerance;
    constructor(minVal: number, viewSize: number, count: number, applyTol?: boolean | undefined, quickMove?: boolean | undefined);
    transition(delta: number): number;
    final(delta: number, speed: number, quickRatio?: number): void;
}
