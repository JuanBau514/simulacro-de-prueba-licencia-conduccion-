import type { ExamResult, Question } from '../types'

interface Props {
  result: ExamResult
  questions: Question[]
  onRetry: () => void
  onHome: () => void
}

export function Results({ result, questions, onRetry, onHome }: Props) {
  const { score, passed, correctAnswers, totalQuestions, answers } = result

  return (
    <div className="results-layout">
      <div className={`result-hero ${passed ? 'passed' : 'failed'}`}>
        <div className="result-icon">{passed ? '✓' : '✗'}</div>
        <h1>{passed ? '¡Aprobado!' : 'No aprobado'}</h1>
        <div className="score-display">
          <span className="score-number">{score.toFixed(1)}%</span>
          <span className="score-label">
            {correctAnswers} correctas de {totalQuestions}
          </span>
        </div>
        <p className="result-message">
          {passed
            ? 'Superaste el puntaje mínimo del 85%. ¡Buen trabajo!'
            : `Necesitas el 85% (43 correctas). Te faltaron ${43 - correctAnswers} respuestas correctas.`}
        </p>
      </div>

      <div className="review-section">
        <h2>Revisión de respuestas</h2>
        <div className="review-list">
          {questions.map((q, idx) => {
            const userAnswer = answers[q.id]
            const isCorrect = userAnswer === q.correctIndex
            const wasAnswered = userAnswer !== undefined

            return (
              <div key={q.id} className={`review-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="review-header">
                  <span className="review-num">#{idx + 1}</span>
                  <span className="review-topic">{q.topic}</span>
                  <span className={`review-badge ${isCorrect ? 'badge-correct' : 'badge-wrong'}`}>
                    {isCorrect ? 'Correcta' : wasAnswered ? 'Incorrecta' : 'Sin responder'}
                  </span>
                </div>
                <p className="review-question">{q.question}</p>
                <div className="review-options">
                  {q.options.map((opt, oi) => {
                    const isRight = oi === q.correctIndex
                    const isUser = oi === userAnswer
                    let cls = 'review-option'
                    if (isRight) cls += ' right-answer'
                    if (isUser && !isRight) cls += ' wrong-answer'
                    return (
                      <div key={oi} className={cls}>
                        <span className="review-letter">{String.fromCharCode(65 + oi)}</span>
                        <span>{opt}</span>
                        {isRight && <span className="tag-correct">Correcta</span>}
                        {isUser && !isRight && <span className="tag-wrong">Tu respuesta</span>}
                      </div>
                    )
                  })}
                </div>
                {q.explanation && (
                  <div className="explanation">
                    <strong>Explicación:</strong> {q.explanation}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="results-actions">
        <button className="btn-secondary" onClick={onHome}>Inicio</button>
        <button className="btn-primary" onClick={onRetry}>Nuevo simulacro</button>
      </div>
    </div>
  )
}
