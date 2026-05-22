import type { Question } from '../types'

interface Props {
  question: Question
  questionNumber: number
  totalQuestions: number
  selectedAnswer: number | undefined
  onAnswer: (optionIndex: number) => void
  onNext: () => void
  onPrev: () => void
  onSubmit: () => void
  answeredCount: number
  canSubmit: boolean
  isLast: boolean
  isFirst: boolean
}

export function ExamQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswer,
  onNext,
  onPrev,
  onSubmit,
  answeredCount,
  canSubmit,
  isLast,
  isFirst,
}: Props) {
  const progress = (answeredCount / totalQuestions) * 100

  return (
    <div className="exam-layout">
      <div className="exam-header">
        <div className="exam-progress-info">
          <span>Pregunta {questionNumber} de {totalQuestions}</span>
          <span className="answered-count">{answeredCount} respondidas</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="question-card">
        <div className="question-topic">{question.topic}</div>
        <p className="question-text">{question.question}</p>

        <div className="options-list">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              className={`option-btn ${selectedAnswer === idx ? 'selected' : ''}`}
              onClick={() => onAnswer(idx)}
            >
              <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="exam-nav">
        <button className="btn-secondary" onClick={onPrev} disabled={isFirst}>
          Anterior
        </button>

        {isLast ? (
          <button
            className="btn-primary"
            onClick={onSubmit}
            disabled={!canSubmit}
            title={!canSubmit ? `Faltan ${totalQuestions - answeredCount} preguntas por responder` : ''}
          >
            {canSubmit ? 'Entregar examen' : `Faltan ${totalQuestions - answeredCount}`}
          </button>
        ) : (
          <button className="btn-primary" onClick={onNext}>
            Siguiente
          </button>
        )}
      </div>
    </div>
  )
}
