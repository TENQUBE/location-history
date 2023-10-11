import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import LocaitonHistoryProvider, { useLocationHistory } from '../dist/esm/'

const White = () => {
  const history = useLocationHistory()

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
  const history = useLocationHistory()

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