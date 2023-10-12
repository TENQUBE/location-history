import { jsx } from 'react/jsx-runtime';
import { createContext, useRef, useContext, useCallback, useEffect, useState } from 'react';

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
    equals(obj) {
        return Object.entries(this).sort().toString() === Object.entries(obj).sort().toString();
    }
}

const LocationContext = createContext(null);
const useLocationHistory = () => {
    const observer = useRef();
    const [history, setHistory] = useContext(LocationContext);
    const setInitHistory = useCallback(() => {
        if (history.list.length > 0)
            return;
        setHistory({
            list: [new LocationVO()],
            before: null
        });
    }, [history]);
    const addObserver = useCallback(() => {
        let oldHref = document.location.href;
        if (observer.current)
            observer.current.disconnect();
        observer.current = new MutationObserver(() => {
            if (oldHref !== document.location.href) {
                oldHref = document.location.href;
                const len = history.list.length;
                const newBefore = len > 0 ? history.list[len - 1] : null;
                const newLocation = new LocationVO();
                if (len > 1 && history.list[len - 2].href === newLocation.href) {
                    setHistory({
                        list: history.list.slice(0, len - 1),
                        before: newBefore
                    });
                }
                else {
                    const list = [...history.list, newLocation];
                    setHistory({
                        list,
                        before: newBefore
                    });
                }
            }
        });
        observer.current.observe(document.body, { childList: true, subtree: true });
    }, [history]);
    useEffect(() => {
        setInitHistory();
        addObserver();
    }, [history]);
    return history;
};
const LocaitonHistoryProvider = ({ children }) => {
    const [history, setHistory] = useState({
        list: [],
        before: null
    });
    return (jsx(LocationContext.Provider, { value: [history, setHistory], children: children }));
};

export { LocaitonHistoryProvider as default, useLocationHistory };
//# sourceMappingURL=index.js.map
