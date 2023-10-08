'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

class LocationVO {
    constructor() {
        const { hash, host, hostname, href, origin, pathname, port, protocol, search } = document.location;
        this.host = host;
        this.hostname = hostname;
        this.href = href;
        this.origin = origin;
        this.pathname = pathname;
        this.port = port;
        this.protocol = protocol;
        this.hash = hash.substring(1);
        this.search = search.substring(1);
        this.hashObj = this.groupParamsByKey(new URLSearchParams(this.hash));
        this.searchObj = this.groupParamsByKey(new URLSearchParams(this.search));
    }
    groupParamsByKey(params) {
        return [...params.entries()].reduce((acc, tuple) => {
            const [key, val] = tuple;
            if (acc.hasOwnProperty(key)) {
                if (Array.isArray(acc[key])) {
                    acc[key] = [...acc[key], val];
                }
                else {
                    acc[key] = [acc[key], val];
                }
            }
            else {
                acc[key] = val;
            }
            return acc;
        }, {});
    }
}

const LocationContext = react.createContext(null);
const useLocationHistory = () => {
    const observer = react.useRef();
    // const [history, setHistory] = useState<ILocationHistory>({
    //   list: [],
    //   before: null
    // })
    const [history, setHistory] = react.useContext(LocationContext);
    const setInitHistory = react.useCallback(() => {
        if (history.list.length > 0)
            return;
        setHistory({
            list: [new LocationVO()],
            before: null
        });
    }, [history]);
    const addObserver = react.useCallback(() => {
        const len = history.list.length;
        let oldHref = document.location.href;
        if (observer.current)
            observer.current.disconnect();
        observer.current = new MutationObserver(() => {
            if (oldHref !== document.location.href) {
                oldHref = document.location.href;
                console.log('start', history);
                const newBefore = len > 0 ? history.list[len - 1] : null;
                const newLocation = new LocationVO();
                if (len > 1 && history.list[len - 2].href === newLocation.href) {
                    setHistory({
                        list: history.list.slice(0, len - 1),
                        before: newBefore
                    });
                }
                else {
                    console.log('add');
                    const list = [...history.list, newLocation];
                    console.log(list);
                    setHistory({
                        list,
                        before: newBefore
                    });
                }
            }
        });
        observer.current.observe(document.body, { childList: true, subtree: true });
    }, [history]);
    react.useEffect(() => {
        setInitHistory();
        addObserver();
    }, [history]);
    return [history, setHistory];
};
const LocaitonHistoryProvider = ({ children }) => {
    const [history, setHistory] = react.useState({
        list: [],
        before: null
    });
    return (jsxRuntime.jsx(LocationContext.Provider, { value: [history, setHistory], children: children }));
};

exports.LocationVO = LocationVO;
exports.default = LocaitonHistoryProvider;
exports.useLocationHistory = useLocationHistory;
//# sourceMappingURL=index.js.map
