>❗ __development halted.__

# @tenqube/locaiton-history
This is a React Hook that can save and use location information in an array format according to history changes.

> '@tenqube/locaiton-history' detects changes in the DOM and saves the location history, so it must be used with a routing-related library such as '[react-router-dom](https://github.com/remix-run/react-router)'.


## Installation
```sh
$ npm install @tenqube/locaiton-history
```

## Quick Start
> For sample configuration, we used 'react-router-dom'.
```ts
import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import LocaitonHistoryProvider, { useLocationHistory, ILocationHistory } from '@tenqube/locaiton-history'

const White = () => {
  const history: ILocationHistory = useLocationHistory()

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
  const history: ILocationHistory = useLocationHistory()

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