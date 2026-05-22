import { Home } from './components/Home'
import { ExamQuestion } from './components/ExamQuestion'
import { Results } from './components/Results'
import { useExam } from './hooks/useExam'

export default function App() {
  const {
    examQuestions,
    currentIndex,
    currentQuestion,
    answers,
    result,
    started,
    answeredCount,
    canSubmit,
    startExam,
    answer,
    next,
    prev,
    submit,
    reset,
    EXAM_SIZE,
  } = useExam()

  if (!started) {
    return (
      <div className="app">
        <Home onStart={startExam} />
      </div>
    )
  }

  if (result) {
    return (
      <div className="app">
        <Results
          result={result}
          questions={examQuestions}
          onRetry={startExam}
          onHome={reset}
        />
      </div>
    )
  }

  if (!currentQuestion) return null

  return (
    <div className="app">
      <ExamQuestion
        question={currentQuestion}
        questionNumber={currentIndex + 1}
        totalQuestions={EXAM_SIZE}
        selectedAnswer={answers[currentQuestion.id]}
        onAnswer={(opt) => answer(currentQuestion.id, opt)}
        onNext={next}
        onPrev={prev}
        onSubmit={submit}
        answeredCount={answeredCount}
        canSubmit={canSubmit}
        isLast={currentIndex === EXAM_SIZE - 1}
        isFirst={currentIndex === 0}
      />
    </div>
  )
}
