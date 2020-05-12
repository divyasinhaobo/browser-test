import { OnInit, ElementRef, EventEmitter } from '@angular/core';
import { TrackableScreen } from '../../../ui/router/trackable-screen';
import { TranslateService } from '../translate';
export declare const PERMISSION: {
    CAMERA: string;
};
export interface UploadedDocParams {
    base64: string;
    checksum: string;
    mimeType: string;
}
export declare class FileUploadComponent implements OnInit {
    rc: any;
    private translate;
    uploadFileCont: ElementRef;
    screen: TrackableScreen;
    eventPropagate: boolean;
    isRequired: boolean;
    value: EventEmitter<UploadedDocParams>;
    uploadedDocParams: UploadedDocParams;
    constructor(rc: any, translate: TranslateService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    private onFileUpload;
    private updatePicture;
    takePicture(): Promise<void>;
    uploadFile(): Promise<void>;
    onSubmit(): void;
}
