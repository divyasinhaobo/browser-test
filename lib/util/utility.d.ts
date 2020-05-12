import { Mubble } from '../../core';
export declare class BaseUtility {
    expandTemplate(template: string, data: Mubble.uObject<any>): string;
    expandTemplateObj(templateObj: any, data: Mubble.uObject<any>): any;
    parseURLForRouter(parser: any): {
        protocol: any;
        host: any;
        hostname: any;
        port: any;
        pathname: any;
        search: any;
        searchObject: {};
        hash: any;
    };
    getUrlParams(genericUrl: string): {} | null;
    getErrorScreenState(errorMessage: string): string;
    getBase64(file: any): Promise<{}>;
    getCheckSum(message: string): Promise<string>;
    hexString(buffer: ArrayBuffer): string;
    getCompressedImage(file: any, changeOrientation?: boolean): Promise<{}>;
    getCanvasImage(image: any, orientation?: number): string;
    getBase64Size(base64: string): number;
}
