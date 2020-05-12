import { RunContextBrowser } from '../../../rc-browser';
export declare class TranslateService {
    private rc;
    private _translations;
    constructor(rc: RunContextBrowser, _translations: any);
    private defaultLang;
    private currentLang;
    private fallback;
    getCurrentLanguage(): string;
    setDefaultLanguage(lang: string): void;
    enableFallback(enable: boolean): void;
    use(lang: string): void;
    private translate;
    addTranslations(langObj: object, lang: string): void;
    instant(key: string, words?: string | string[]): string;
    replace(word?: string, words?: string | string[]): string;
}
