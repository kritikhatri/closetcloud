import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext.js'

/*
  const { openQuiz } = useQuiz()
  <button onClick={openQuiz}>Take the quiz</button>
*/
export default function useQuiz() {
  const quiz = useContext(QuizContext)
  if (!quiz) throw new Error('useQuiz must be used inside <QuizProvider>')
  return quiz
}
