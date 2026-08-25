import { profile } from "../content/profile";

const projectEvidence = [
  {
    index: "A",
    title: "品牌舆情与洞察：从复杂企业数据到持续客户价值",
    detail: "连接多源数据、客户定制、报告交付与增值机会，证明 AI 方案可以持续进入客户工作流。",
    tag: "BUSINESS INSIGHT",
  },
  {
    index: "B",
    title: "翻译质量 Agent：生成与评测相互独立",
    detail: "以完整上下文、回译一致性、异常分流和人工审核构成可验证的质量闭环。",
    tag: "WORKFLOW / EVALUATION",
  },
  {
    index: "C",
    title: "媒介流量洞察平台：把专家分析方法做成 Web 产品",
    detail: "从专家采访、PRD、Prompt 到 UI 与客户测试，完成可直接使用的 AI 数据产品。",
    tag: "AI PRODUCT BUILDING",
  },
  {
    index: "D",
    title: "广告投放素材洞察数字员工：从交付到规模化复用",
    detail: "以 Skill、客户级配置和质量关卡累计处理 5000+ 素材，完成 30+ 次完整技能流程运行。",
    tag: "DELIVERY / SCALE",
  },
] as const;

export function CapabilityMethod() {
  return (
    <section className="content-section capability-method section-shell" id="method">
      <div className="section-heading section-heading-split">
        <div className="section-kicker">
          <span>02</span>
          <p>ENTERPRISE AI CAPABILITIES</p>
        </div>
        <div>
          <h2>从客户需求到 AI 落地</h2>
          <p>能力不靠自我描述，而由四个不同项目分别证明。</p>
        </div>
      </div>

      <div className="cross-capability-grid">
        {profile.capabilities.map((capability) => (
          <article key={capability.number}>
            <span>{capability.number}</span>
            <h3>{capability.title}</h3>
            <p>{capability.description}</p>
            <small>{capability.evidence}</small>
          </article>
        ))}
      </div>

      <div className="method-panel">
        <div className="method-panel-heading">
          <p className="mono-label">REUSABLE DELIVERY METHOD</p>
          <h3>一套方法，适配不同企业 AI 场景</h3>
          <p>先理解工作，再定义 AI；用真实交付验证，再把有效能力沉淀为可复用系统。</p>
        </div>
        <ol className="method-flow">
          {profile.methodSteps.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
      </div>

      <div className="cross-project-evidence">
        {projectEvidence.map((item) => (
          <article key={item.index}>
            <div>
              <span>{item.index}</span>
              <small>{item.tag}</small>
            </div>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
