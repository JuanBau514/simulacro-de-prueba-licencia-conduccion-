export interface Question {
  id: number
  topic: string
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
}

export interface ExamResult {
  totalQuestions: number
  correctAnswers: number
  score: number
  passed: boolean
  answers: Record<number, number>
}

export type AppView = 'home' | 'exam' | 'results' | 'study'
