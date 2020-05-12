import { RunContextBrowser } from '../rc-browser';
declare class AudioFile {
    fileName: string;
    volume?: number | undefined;
    constructor(fileName: string, volume?: number | undefined);
}
export declare class AudioPlayer {
    private rc;
    readonly SELECT: AudioFile;
    private audioMap;
    constructor(rc: RunContextBrowser);
    play(file: AudioFile): void;
}
export {};
