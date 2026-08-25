import { profile } from "../content/profile";

export function ProofMetrics() {
  return (
    <section className="proof-section section-shell" aria-label="关键成果">
      <p className="proof-label">PROVEN IN REAL BUSINESS WORKFLOWS</p>
      <div className="proof-metric-grid">
        {profile.heroMetrics.map((metric, index) => (
          <article className="proof-metric" key={metric.label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{metric.value}</strong>
            <p>{metric.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
