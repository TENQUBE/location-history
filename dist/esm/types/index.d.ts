import { ILocationVO } from "./vos/location";
interface ILocationHistory {
    list: ILocationVO[];
    before: ILocationVO | null;
}
declare const useLocationHistory: () => ILocationHistory;
declare const LocaitonHistoryProvider: ({ children }: {
    children: any;
}) => import("react/jsx-runtime").JSX.Element;
export { useLocationHistory, ILocationVO, ILocationHistory };
export default LocaitonHistoryProvider;
