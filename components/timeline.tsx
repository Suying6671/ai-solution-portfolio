type TimelineItem = {
  period: string;
  organization: string;
  role: string;
  description: string;
  clients?: string;
};

type Education = {
  organization: string;
  degree: string;
  detail: string;
};

export function Timeline({
  items,
  earlierExperience,
  education,
}: {
  items: readonly TimelineItem[];
  earlierExperience: readonly string[];
  education: Education;
}) {
  return (
    <div className="experience-layout">
      <aside className="experience-summary">
        <p className="mono-label">WORK &amp; EDUCATION</p>
        <h2>在业务、产品与 AI 工程之间持续靠近。</h2>
        <p>商业教育让我习惯从价值出发，客户项目让我把判断落到真实产品和结果里。</p>
        <div className="education-card">
          <span>EDUCATION</span>
          <h3>{education.organization}</h3>
          <strong>{education.degree}</strong>
          <p>{education.detail}</p>
        </div>
      </aside>

      <div className="timeline">
        {items.map((item, index) => (
          <article className="timeline-item" key={`${item.period}-${item.organization}`}>
            <div className="timeline-rail" aria-hidden="true">
              <span className={index === 0 ? "timeline-dot is-current" : "timeline-dot"} />
            </div>
            <div className="timeline-content">
              <span>{item.period}</span>
              <p>{item.organization}</p>
              <h3>{item.role}</h3>
              <small>{item.description}</small>
              {item.clients ? <b>{item.clients}</b> : null}
            </div>
          </article>
        ))}

        <details className="earlier-experience">
          <summary>查看更早经历 <span aria-hidden="true">＋</span></summary>
          <ul>
            {earlierExperience.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </details>
      </div>
    </div>
  );
}
