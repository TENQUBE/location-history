import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import LocaitonHistoryProvider, { useLocationHistory } from '../dist/esm/'

const White = () => {
  const [history, setHistory] = useLocationHistory()

  useEffect(() => {
    console.log(history)
  }, [history])

  return (
    <div>
      <h1>white</h1>
      <Link to="/black">black</Link>
    </div>
  )
}

const Black = () => {
  const [history, setHistory] = useLocationHistory()

  useEffect(() => {
    console.log(history)
  }, [history])

  return (
    <div>
      <h1>black</h1>
      <Link to="/red">red</Link>
    </div>
  )
}

const Red = () => {
  const [history, setHistory] = useLocationHistory()

  useEffect(() => {
    console.log(history)
  }, [history])

  return (
    <div>
      <h1>Red</h1>
      <Link to="/">white</Link>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <White />
  },
  {
    path: "black",
    element: <Black />
  },
  {
    path: "red",
    element: <Red />
  },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <LocaitonHistoryProvider>
    <RouterProvider router={router} />
  </LocaitonHistoryProvider>
);