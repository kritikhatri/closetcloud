import { createBrowserRouter, RouterProvider } from 'react-router'
import AppLayout from './layouts/AppLayout/AppLayout.jsx'
import RootLayout from './layouts/RootLayout.jsx'
import Calendar from './pages/Calendar/Calendar.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Inspiration from './pages/Inspiration/Inspiration.jsx'
import Landing from './pages/Landing/Landing.jsx'
import Outfits from './pages/Outfits/Outfits.jsx'
import RouteError from './pages/RouteError/RouteError.jsx'
import Settings from './pages/Settings/Settings.jsx'
import StyleGuide from './pages/StyleGuide/StyleGuide.jsx'
import Wardrobe from './pages/Wardrobe/Wardrobe.jsx'
import WardrobeItem from './pages/WardrobeItem/WardrobeItem.jsx'
import WardrobeItemEdit from './pages/WardrobeItemEdit/WardrobeItemEdit.jsx'
import WardrobeItemNew from './pages/WardrobeItemNew/WardrobeItemNew.jsx'

/*
  The route map: which URL shows which page.

  RootLayout wraps everything. Inside it:
    • "/" is the public front page (no sidebar)
    • every other page sits inside AppLayout, a "layout route" with no
      path of its own: it renders the sidebar/tab bar once, and each child
      page appears inside its <Outlet />.
*/
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { path: '/', element: <Landing /> },
      {
        element: <AppLayout />,
        children: [
          { path: 'home', element: <Dashboard /> },
          { path: 'wardrobe', element: <Wardrobe /> },
          // React Router ranks exact words above :params, so /wardrobe/new
          // never matches /wardrobe/:id.
          { path: 'wardrobe/new', element: <WardrobeItemNew /> },
          { path: 'wardrobe/:id', element: <WardrobeItem /> },
          { path: 'wardrobe/:id/edit', element: <WardrobeItemEdit /> },
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
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
