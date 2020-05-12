import { Mubble } from '../';
import { Protocol, XmnProvider } from './xmn-core';
import { CustomData } from './custom-data';
export interface ConnectionInfo {
    shortName: string;
    protocol: Protocol;
    host: string;
    port: number;
    url: string;
    headers: Mubble.uObject<any>;
    ip: string;
    msOffset: number;
    lastEventTs: number;
    lastRequestTs: number;
    protocolVersion: string;
    provider: XmnProvider;
    customData: CustomData;
}
