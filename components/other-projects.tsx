type OtherProject = {
  category: string;
  title: string;
  description: string;
  result: string;
  tags: readonly string[];
};

export function OtherProjects({ projects }: { projects: readonly OtherProject[] }) {
  return (
    <section className="content-section section-shell other-projects-section">
      <div className="section-heading section-heading-split">
        <div className="section-kicker">
          <span>06</span>
          <p>OTHER AI PRACTICE</p>
        </div>
        <div>
          <h2>其他 AI 实践</h2>
          <p>在内容生产与 To C 服务场景里，继续验证 AI 如何进入真实工作。</p>
        </div>
      </div>
      <div className="other-project-grid">
        {projects.map((project, index) => (
          <article key={project.title}>
            <div className="other-project-topline">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>{project.category}</small>
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <strong>{project.result}</strong>
            <div className="tag-row">
              {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
