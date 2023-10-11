import { useEffect, useRef, useCallback, useState, createContext, useContext } from "react"
import LocationVO, { ILocationVO } from "./vos/location"


interface ILocationHistory {
  list: ILocationVO[],
  before: ILocationVO | null
}

type ReturnTypes = [ILocationHistory, (newHistory: ILocationHistory) => void]

const LocationContext = createContext(null)

const useLocationHistory = (): ReturnTypes => {
  const observer = useRef<MutationObserver>()

  const [history, setHistory] = useContext(LocationContext)

  const setInitHistory = useCallback(() => {
    if(history.list.length > 0) return
    setHistory({
      list: [new LocationVO()],
      before: null
    })
  }, [history])

  const addObserver = useCallback(() => {
    const len = history.list.length
    let oldHref = document.location.href
    
    if(observer.current) observer.current.disconnect()
    observer.current = new MutationObserver(() => {
      if (oldHref !== document.location.href) {
        oldHref = document.location.href

        const newBefore = len > 0 ? history.list[len - 1] : null
        const newLocation = new LocationVO()

        if(len > 1 && history.list[len-2].href === newLocation.href) {
          setHistory({
            list: history.list.slice(0, len - 1),
            before: newBefore
          })
        } else {
          const list = [...history.list, newLocation]
          setHistory({
            list,
            before: newBefore
          })
        }
      }
    })

    observer.current.observe(document.body, { childList: true, subtree: true, attributes: true })
  }, [history])

  useEffect(() => {    
    setInitHistory()
    addObserver()
  }, [history])

  return history
}


const LocaitonHistoryProvider = ({ children }) => {
  const [history, setHistory] = useState<ILocationHistory>({
    list: [],
    before: null
  })

  const observerTrigger = useCallback(() => {
    document.body.setAttribute('data-lh-update', String(new Date().getTime()))
  }, [])

  useEffect(() => {
    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray) => {
        observerTrigger()
        return target.apply(thisArg, argArray)
      }
    })

    window.addEventListener('popstate', observerTrigger)
    return () => {
      window.removeEventListener('popstate', observerTrigger)
    }
  }, [])

  return (
    <LocationContext.Provider value={[history, setHistory]}>
      {children}
    </LocationContext.Provider>
  )
}


export { useLocationHistory, LocationVO, ILocationVO, ILocationHistory }
export default LocaitonHistoryProvider