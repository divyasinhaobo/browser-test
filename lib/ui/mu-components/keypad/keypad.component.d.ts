import { RunContextApp } from 'framework';
export declare enum KEYBOARD_MODE {
    NORMAL = "NORMAL",
    SHOW_DOT = "SHOW_DOT"
}
export declare enum KEY_TYPE {
    NUMBER = "NUMBER",
    BACK = "BACK",
    DONE = "DONE",
    DOT = "DOT"
}
export interface KeyPressData {
    keyType: KEY_TYPE;
    key: string;
}
export declare class KeypadComponent {
    rc: RunContextApp;
    mode: KEYBOARD_MODE;
    keyPress: any;
    KEYBOARD_MODE: typeof KEYBOARD_MODE;
    constructor(rc: RunContextApp);
    ngOnInit(): void;
    keyClick(inputNum: string): void;
    onKeyBoardBack(): void;
    onKeyBoardOk(): void;
    onKeyBoardDot(): void;
}
