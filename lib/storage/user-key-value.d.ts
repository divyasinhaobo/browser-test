import { RunContextBrowser } from '../rc-browser';
import { StorageProvider } from './storage-provider';
export declare const USERS = "users";
export declare abstract class UserKeyValue {
    protected rc: RunContextBrowser;
    private storage;
    private _clientId;
    private _userLinkId;
    private _webProfilePicBase64;
    userName: string;
    screenVisitedStates: {
        [compName: string]: boolean;
    };
    private users;
    private lastClientId;
    constructor(rc: RunContextBrowser, storage: StorageProvider);
    init(): Promise<this | undefined>;
    registerNewUser(clientId: number, userLinkId: string, userName: string): Promise<void>;
    setScreenVisited(routeName: string): void;
    setWebProfilePicBase64(rc: RunContextBrowser, base64: string): void;
    logOutCurrentUser(): Promise<string>;
    switchUserOnCurrRun(clientId: number): Promise<void>;
    save(rc: RunContextBrowser): Promise<void>;
    getWebProfilePicBase64(clientId: number): string;
    getAllClientIds(): number[];
    getAllUserLinkIds(): string[];
    getClientIdForUserLink(reqUserLinkId: string): number;
    getUserInfo(clientId: number): object;
    clientId: number;
    userLinkId: string;
    serialize(): object;
    deserialize(obj: {
        [key: string]: any;
    }): void;
    $dump(): void;
}
