import { useState, useCallback } from 'react'
import type { Question, ExamResult } from '../types'
import { questions } from '../data/questions'

const EXAM_SIZE = 50
const PASS_SCORE = 85

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function useExam() {
  const [examQuestions, setExamQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [result, setResult] = useState<ExamResult | null>(null)
  const [started, setStarted] = useState(false)

  const startExam = useCallback(() => {
    const selected = shuffle(questions).slice(0, EXAM_SIZE)
    setExamQuestions(selected)
    setCurrentIndex(0)
    setAnswers({})
    setResult(null)
    setStarted(true)
  }, [])

  const answer = useCallback((questionId: number, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }))
  }, [])

  const next = useCallback(() => {
    setCurrentIndex(prev => Math.min(prev + 1, EXAM_SIZE - 1))
  }, [])

  const prev = useCallback(() => {
    setCurrentIndex(prev => Math.max(prev - 1, 0))
  }, [])

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const submit = useCallback(() => {
    let correct = 0
    for (const q of examQuestions) {
      if (answers[q.id] === q.correctIndex) correct++
    }
    const score = (correct / EXAM_SIZE) * 100
    setResult({
      totalQuestions: EXAM_SIZE,
      correctAnswers: correct,
      score,
      passed: score >= PASS_SCORE,
      answers,
    })
  }, [examQuestions, answers])

  const reset = useCallback(() => {
    setStarted(false)
    setResult(null)
    setAnswers({})
    setCurrentIndex(0)
    setExamQuestions([])
  }, [])

  const answeredCount = Object.keys(answers).length
  const canSubmit = answeredCount === EXAM_SIZE

  return {
    examQuestions,
    currentIndex,
    currentQuestion: examQuestions[currentIndex] ?? null,
    answers,
    result,
    started,
    answeredCount,
    canSubmit,
    startExam,
    answer,
    next,
    prev,
    goTo,
    submit,
    reset,
    EXAM_SIZE,
    PASS_SCORE,
  }
}
