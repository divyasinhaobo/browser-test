export declare class TextEncDec {
    constructor(encFormat: string);
    encode(str: string): Uint8Array;
    decode(uar: Uint8Array): string;
}
