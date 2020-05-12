export declare class LongPressDirective {
    private timeoutId;
    private intervalId;
    private isLongPressing;
    private isPressing;
    onLongPress: any;
    onLongPressing: any;
    isTouching: any;
    timeout: number;
    readonly press: boolean;
    readonly longPress: boolean;
    onMouseDown(event: any): void;
    onMouseLeave(): void;
    private endPress;
}
