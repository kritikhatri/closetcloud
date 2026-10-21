import { Outlet, ScrollRestoration } from 'react-router'
import QuizProvider from '../components/Quiz/QuizProvider.jsx'

/*
  Wraps every page, both the public front page and the app.
    • QuizProvider: the style quiz pop-up, available on any page
    • ScrollRestoration: scrolls to the top on new pages and back to where
      you were when you press the browser's Back button
*/
export default function RootLayout() {
  return (
    <QuizProvider>
      <Outlet />
      <ScrollRestoration />
    </QuizProvider>
  )
}
