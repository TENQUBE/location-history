interface ILocationVO {
  readonly hash: string
  readonly host: string
  readonly hostname: string
  readonly href: string
  readonly origin: string
  readonly pathname: string
  readonly port: string
  readonly protocol: string
  readonly search: string
  
  readonly searchObj: unknown
  readonly hashObj: unknown
}

class LocationVO implements ILocationVO {
  
  readonly hash: string
  readonly host: string
  readonly hostname: string
  readonly href: string
  readonly origin: string
  readonly pathname: string
  readonly port: string
  readonly protocol: string
  readonly search: string
  
  readonly searchObj: unknown
  readonly hashObj: unknown

  constructor() {
    const { hash, host, hostname, href, origin, pathname, port, protocol, search } = document.location

    this.host = host
    this.hostname = hostname
    this.href = href
    this.origin = origin
    this.pathname = pathname
    this.port = port
    this.protocol = protocol

    this.hash = hash.substring(1)
    this.search = search.substring(1)

    this.hashObj = this.groupParamsByKey(new URLSearchParams(this.hash))
    this.searchObj = this.groupParamsByKey(new URLSearchParams(this.search))
  }

  private groupParamsByKey(params: URLSearchParams) {
    return [...params.entries()].reduce((acc, tuple) => {
      const [key, val] = tuple
      if(acc.hasOwnProperty(key)) {
         if(Array.isArray(acc[key])) {
           acc[key] = [...acc[key], val]
         } else {
           acc[key] = [acc[key], val]
         }
      } else {
       acc[key] = val
      }
      return acc
    }, {})
  }

  equals(obj: unknown) {
    return Object.entries(this).sort().toString() === Object.entries(obj).sort().toString()
  }
  
}

export { ILocationVO }
export default LocationVO