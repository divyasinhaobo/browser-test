export interface coFunc {
    (): Promise<any>;
}
export declare function co(gen: coFunc): Promise<{}>;
