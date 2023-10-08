import { useEffect, useRef, useCallback } from "react"
import LocationVO, { ILocationVO } from "./vos/location"
import { useLocation } from "./recoils/location"

interface ILocationHistory {
  list: ILocationVO[],
  before: ILocationVO | null
}

type ReturnTypes = [ILocationHistory, (newHistory: ILocationHistory) => void]

const useLocationHistory = (): ReturnTypes => {
  const observer = useRef<MutationObserver>()
  const [history, setHistory] = useLocation()

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

    observer.current.observe(document.body, { childList: true, subtree: true })
  }, [history])

  useEffect(() => {    
    setInitHistory()
    addObserver()
  }, [history])

  return [history, setHistory]
}


export { LocationVO, ILocationVO, ILocationHistory}
export default useLocationHistory