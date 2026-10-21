import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { QuizContext } from '../../context/QuizContext.js'
import QuizDialog from './QuizDialog.jsx'

/*
  Makes the style quiz available everywhere as a pop-up, instead of a
  separate page. Any component can call openQuiz() (see useQuiz).

  The URL is the single source of truth: the pop-up is open whenever the
  address has ?quiz=open. That means:
    • a visitor who signs up from the quiz result is sent back to
      "<the page they were on>?quiz=open" and the quiz is waiting
    • following any link elsewhere closes it automatically
  `replace` updates the address without adding Back-button steps, and
  preventScrollReset keeps the page behind exactly where it was.
*/
export default function QuizProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const isOpen = searchParams.get('quiz') === 'open'

  const setQuizParam = useCallback(
    (open) =>
      setSearchParams(
        (params) => {
          if (open) params.set('quiz', 'open')
          else params.delete('quiz')
          return params
        },
        { replace: true, preventScrollReset: true },
      ),
    [setSearchParams],
  )

  const openQuiz = useCallback(() => setQuizParam(true), [setQuizParam])
  const closeQuiz = useCallback(() => setQuizParam(false), [setQuizParam])

  const value = useMemo(() => ({ openQuiz, closeQuiz }), [openQuiz, closeQuiz])

  return (
    <QuizContext.Provider value={value}>
      {children}
      <QuizDialog open={isOpen} onClose={closeQuiz} />
    </QuizContext.Provider>
  )
}
