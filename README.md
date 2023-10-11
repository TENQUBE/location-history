>❗ __The current version is being developed and tested internally.__

# @tenqube/locaiton-history
The position value of the previous page and the page movement history are recorded in the form of an array.

## Installation
```sh
$ npm install @tenqube/locaiton-history
```

## Quick Start
> For simple sample configuration, we used 'react-router-dom'.
```ts
import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import LocaitonHistoryProvider, { useLocationHistory, ILocationHistory } from '@tenqube/locaiton-history'

const White = () => {
  const history = useLocationHistory<ILocationHistory>()

  useEffect(() => {
    console.log(history)
  }, [history])

  return (
    <div>
      <h1>white</h1>
      <Link to="/black?foo=bar">/black?foo=bar</Link>
    </div>
  )
}

const Black = () => {
  const history = useLocationHistory<ILocationHistory>()

  useEffect(() => {
    console.log(history)
  }, [history])

  return (
    <div>
      <h1>black</h1>
      <Link to="/">/</Link>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <White />
  },
  {
    path: "/black",
    element: <Black />
  }
])

createRoot(document.getElementById("root") as HTMLElement).render(
  <LocaitonHistoryProvider>
    <RouterProvider router={router} />
  </LocaitonHistoryProvider>
)
```

## Interfaces
```ts
interface ILocationHistory {
  list: ILocationVO[],
  before: ILocationVO | null
}
```

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