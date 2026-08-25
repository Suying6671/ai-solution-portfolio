"use client";

import { useState } from "react";
import type { CaseStudy } from "../content/profile";
import { nextExpandedProjectId } from "../lib/projects";

type ProjectShowcaseProps = {
  projects: readonly CaseStudy[];
};

function ProjectButton({
  expanded,
  onClick,
}: {
  expanded: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="case-button"
      aria-expanded={expanded}
      aria-controls="expanded-case-study"
      onClick={onClick}
    >
      {expanded ? "收起完整案例" : "查看完整案例"}
      <span aria-hidden="true">{expanded ? "×" : "→"}</span>
    </button>
  );
}

function CaseStudyDetails({ project }: { project: CaseStudy }) {
  return (
    <article className="expanded-case-study" id="expanded-case-study">
      <div className="case-detail-heading">
        <div>
          <p className="mono-label">EXPANDED CASE · INLINE</p>
          <h3>{project.title}</h3>
        </div>
        <p>{project.overview}</p>
      </div>

      <div className="case-story-grid">
        <section>
          <span>01</span>
          <h4>业务问题</h4>
          <p>{project.problem}</p>
        </section>
        <section>
          <span>02</span>
          <h4>关键判断</h4>
          <p>{project.judgment}</p>
        </section>
        <section>
          <span>03</span>
          <h4>解决方案</h4>
          <p>{project.solution}</p>
        </section>
      </div>

      <div className="case-workflow" aria-label={`${project.title}工作流`}>
        {project.workflow.map((node, index) => (
          <div className="workflow-step" key={`${project.id}-${node.title}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{node.title}</strong>
            {node.detail ? <small>{node.detail}</small> : null}
          </div>
        ))}
      </div>

      <div className="case-ownership">
        {project.ownership.map((item) => (
          <section key={item.title}>
            <h4>{item.title}</h4>
            <p>{item.detail}</p>
          </section>
        ))}
      </div>

      <div className="case-results">
        {project.results.map((metric) => (
          <div key={`${project.id}-${metric.label}`}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>

      <blockquote>{project.learning}</blockquote>
    </article>
  );
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [flagship, ...selectedProjects] = projects;
  const selectedProject = projects.find((project) => project.id === expandedId) ?? null;

  if (!flagship) return null;

  const toggle = (projectId: string) => {
    setExpandedId((current) => nextExpandedProjectId(current, projectId));
  };

  return (
    <div className="project-showcase">
      <article className="flagship-project">
        <div className="flagship-copy">
          <p className="project-category">旗舰案例 · {flagship.category}</p>
          <h3>{flagship.title}</h3>
          <p>{flagship.summary}</p>
          <div className="flagship-metrics">
            {flagship.metrics.map((metric) => (
              <span key={metric.label}>
                <strong>{metric.value}</strong> {metric.label}
              </span>
            ))}
          </div>
        </div>
        <ProjectButton
          expanded={expandedId === flagship.id}
          onClick={() => toggle(flagship.id)}
        />
      </article>

      <div className="selected-project-grid">
        {selectedProjects.map((project) => (
          <article className="selected-project-card" key={project.id}>
            <p className="project-category">{project.category}</p>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <div className="project-proof-list">
              {project.metrics.map((metric) => (
                <span key={metric.label}>
                  <strong>{metric.value}</strong>
                  {metric.label}
                </span>
              ))}
            </div>
            <ProjectButton
              expanded={expandedId === project.id}
              onClick={() => toggle(project.id)}
            />
          </article>
        ))}
      </div>

      {selectedProject ? <CaseStudyDetails project={selectedProject} /> : null}
    </div>
  );
}
