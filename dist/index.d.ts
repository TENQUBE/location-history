import * as react_jsx_runtime from 'react/jsx-runtime';

interface ILocationVO {
    readonly hash: string;
    readonly host: string;
    readonly hostname: string;
    readonly href: string;
    readonly origin: string;
    readonly pathname: string;
    readonly port: string;
    readonly protocol: string;
    readonly search: string;
    readonly searchObj: unknown;
    readonly hashObj: unknown;
}
declare class LocationVO implements ILocationVO {
    readonly hash: string;
    readonly host: string;
    readonly hostname: string;
    readonly href: string;
    readonly origin: string;
    readonly pathname: string;
    readonly port: string;
    readonly protocol: string;
    readonly search: string;
    readonly searchObj: unknown;
    readonly hashObj: unknown;
    constructor();
    private groupParamsByKey;
    equals(obj: unknown): boolean;
}

interface ILocationHistory {
    list: ILocationVO[];
    before: ILocationVO | null;
}
type ReturnTypes = [ILocationHistory, (newHistory: ILocationHistory) => void];
declare const useLocationHistory: () => ReturnTypes;
declare const LocaitonHistoryProvider: ({ children }: {
    children: any;
}) => react_jsx_runtime.JSX.Element;

export { type ILocationHistory, type ILocationVO, LocationVO, LocaitonHistoryProvider as default, useLocationHistory };
