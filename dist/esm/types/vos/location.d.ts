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
export { ILocationVO };
export default LocationVO;
