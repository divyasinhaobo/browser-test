export declare const THRESHOLD = 0.8;
export declare const GUTTER_WIDTH = 10;
export interface NailConfig {
    axisX: boolean;
    axisY: boolean;
    threshold?: number;
    gutterWidth?: number;
    gutterLeft?: NailInterface;
    gutterRight?: NailInterface;
    disallowLeft?: boolean;
    disallowRight?: boolean;
}
export declare enum DIRECTION {
    UP = 1,
    RIGHT = 2,
    DOWN = 4,
    LEFT = 8
}
export declare enum AXIS {
    X = 1,
    Y = 2
}
export interface NailInterface {
    onTouchStart?(event: any): void;
    onPanStart?(event: any): void;
    onPanMove(event: any): boolean;
    onPanEnd(event: any): void;
    onTouchEnd?(event: any): void;
    onPanAnimate?(...animateParam: any[]): void;
}
