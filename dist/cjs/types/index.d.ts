import LocationVO, { ILocationVO } from "./vos/location";
interface ILocationHistory {
    list: ILocationVO[];
    before: ILocationVO | null;
}
type ReturnTypes = [ILocationHistory, (newHistory: ILocationHistory) => void];
declare const useLocationHistory: () => ReturnTypes;
export { LocationVO, ILocationVO, ILocationHistory };
export default useLocationHistory;
