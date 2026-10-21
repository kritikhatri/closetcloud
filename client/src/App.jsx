import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import AuthProvider from './components/Auth/AuthProvider.jsx'
import RequireAuth from './components/Auth/RequireAuth.jsx'
import useAuth from './hooks/useAuth.js'
import AppLayout from './layouts/AppLayout/AppLayout.jsx'
import RootLayout from './layouts/RootLayout.jsx'
import Calendar from './pages/Calendar/Calendar.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Inspiration from './pages/Inspiration/Inspiration.jsx'
import Landing from './pages/Landing/Landing.jsx'
import Login from './pages/Login/Login.jsx'
import Outfits from './pages/Outfits/Outfits.jsx'
import RouteError from './pages/RouteError/RouteError.jsx'
import Settings from './pages/Settings/Settings.jsx'
import Signup from './pages/Signup/Signup.jsx'
import StyleGuide from './pages/StyleGuide/StyleGuide.jsx'
import Wardrobe from './pages/Wardrobe/Wardrobe.jsx'
import WardrobeItem from './pages/WardrobeItem/WardrobeItem.jsx'
import WardrobeItemEdit from './pages/WardrobeItemEdit/WardrobeItemEdit.jsx'
import WardrobeItemNew from './pages/WardrobeItemNew/WardrobeItemNew.jsx'

/*
  The route map: which URL shows which page.

  RootLayout wraps everything. Inside it:
    • "/", "/login", "/signup" and "/quiz" are public (no sidebar)
    • every other page is wrapped twice, using "layout routes" (routes with
      no path of their own that render an <Outlet /> for their children):
        RequireAuth – sends logged-out visitors to /login
        AppLayout   – the sidebar/tab bar around each page
*/
/* /quiz → your dashboard (or the front page) with the quiz pop-up open. */
function QuizRedirect() {
  const { user, status } = useAuth()
  if (status === 'loading') return null
  return <Navigate to={user ? '/home?quiz=open' : '/?quiz=open'} replace />
}

const appPages = [
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
  ...(import.meta.env.DEV ? [{ path: 'style-guide', element: <StyleGuide /> }] : []),
]

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { path: '/', element: <Landing /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      // The quiz is a pop-up now; old /quiz links open it on a real page.
      { path: 'quiz', element: <QuizRedirect /> },
      {
        element: <RequireAuth />,
        children: [{ element: <AppLayout />, children: appPages }],
      },
    ],
  },
])

/* AuthProvider sits outside the router so every page, public or private,
   can ask "who is logged in?" */
export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
