export declare class Master {
    static field(optional?: boolean): (target: any, propertyKey: string) => void;
    static key(modelName?: string): (target: any, propertyKey: string) => void;
    private static getType;
}
