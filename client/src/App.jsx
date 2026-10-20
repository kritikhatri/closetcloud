import { createBrowserRouter, RouterProvider } from 'react-router'
import AppLayout from './layouts/AppLayout/AppLayout.jsx'
import Calendar from './pages/Calendar/Calendar.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Inspiration from './pages/Inspiration/Inspiration.jsx'
import Outfits from './pages/Outfits/Outfits.jsx'
import RouteError from './pages/RouteError/RouteError.jsx'
import Settings from './pages/Settings/Settings.jsx'
import StyleGuide from './pages/StyleGuide/StyleGuide.jsx'
import Wardrobe from './pages/Wardrobe/Wardrobe.jsx'

/*
  The route map: which URL shows which page.
  AppLayout is a "layout route": it renders the sidebar/tab bar once,
  and each child page appears inside its <Outlet />.
*/
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'wardrobe', element: <Wardrobe /> },
      { path: 'outfits', element: <Outfits /> },
      { path: 'calendar', element: <Calendar /> },
      { path: 'inspiration', element: <Inspiration /> },
      { path: 'settings', element: <Settings /> },
      // Dev-only design reference. import.meta.env.DEV is false in
      // production builds, so this route doesn't exist on the live site.
      ...(import.meta.env.DEV
        ? [{ path: 'style-guide', element: <StyleGuide /> }]
        : []),
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
