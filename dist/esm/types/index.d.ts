import LocationVO, { ILocationVO } from "./vos/location";
interface ILocationHistory {
    list: ILocationVO[];
    before: ILocationVO | null;
}
type ReturnTypes = [ILocationHistory, (newHistory: ILocationHistory) => void];
declare const useLocationHistory: () => ReturnTypes;
declare const LocaitonHistoryProvider: ({ children }: {
    children: any;
}) => import("react/jsx-runtime").JSX.Element;
export { useLocationHistory, LocationVO, ILocationVO, ILocationHistory };
export default LocaitonHistoryProvider;
