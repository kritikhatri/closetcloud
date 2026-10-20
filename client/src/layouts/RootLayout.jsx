import { Outlet, ScrollRestoration } from 'react-router'

/*
  Wraps every page, both the public front page and the app.
  ScrollRestoration scrolls to the top on new pages and back to where you
  were when you press the browser's Back button.
*/
export default function RootLayout() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  )
}
