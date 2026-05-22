import { questions } from '../data/questions'

interface Props {
  onStart: () => void
}

const topicCount: Record<string, number> = {}
for (const q of questions) {
  topicCount[q.topic] = (topicCount[q.topic] ?? 0) + 1
}

export function Home({ onStart }: Props) {
  return (
    <div className="home">
      <div className="home-hero">
        <div className="badge">Licencia C1 — Colombia</div>
        <h1>Simulacro Examen Teórico</h1>
        <p className="subtitle">
          Ley 769 — Código Nacional de Tránsito
        </p>
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-number">{questions.length}</span>
            <span className="stat-label">preguntas en el banco</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">50</span>
            <span className="stat-label">preguntas por examen</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">85%</span>
            <span className="stat-label">puntaje mínimo para aprobar</span>
          </div>
        </div>
        <button className="btn-primary btn-large" onClick={onStart}>
          Iniciar Simulacro
        </button>
      </div>

      <div className="topics-section">
        <h2>Temas evaluados</h2>
        <div className="topics-grid">
          {Object.entries(topicCount).map(([topic, count]) => (
            <div key={topic} className="topic-chip">
              <span className="topic-name">{topic}</span>
              <span className="topic-count">{count} pregs.</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
