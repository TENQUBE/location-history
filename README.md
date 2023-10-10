# @tenqube/locaiton-history
The position value of the previous page and the page movement history are recorded in the form of an array.

## Installation
```sh
$ npm install @tenqube/locaiton-history
```

## Quick Start
```ts
import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import LocaitonHistoryProvider, { useLocationHistory } from '../dist/esm/'

const App = () => {
  const [history, setHistory] = useLocationHistory()

  useEffect(() => {
    console.log(history)
  }, [history])

  return (
    <div>
      <h1>hello world</h1>
    <div>
  )
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <LocaitonHistoryProvider>
    <App />
  </LocaitonHistoryProvider>
)
```

## Value Object
```ts
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
```

## Demo
![demo](https://images.tenqube.com/labs/location-history-demo.png)