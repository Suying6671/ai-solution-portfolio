import { CapabilityMethod } from "../components/capability-method";
import { ClientDelivery } from "../components/client-delivery";
import { ContactPanel } from "../components/contact-panel";
import { Hero } from "../components/hero";
import { OtherProjects } from "../components/other-projects";
import { ProjectShowcase } from "../components/project-showcase";
import { ProofMetrics } from "../components/proof-metrics";
import { SiteHeader } from "../components/site-header";
import { Timeline } from "../components/timeline";
import { Toolkit } from "../components/toolkit";
import { profile } from "../content/profile";

function SectionHeading({
  index,
  label,
  title,
  description,
}: {
  index: string;
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="section-heading">
      <div className="section-kicker">
        <span>{index}</span>
        <p>{label}</p>
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <ProofMetrics />

      <section className="content-section section-shell" id="projects">
        <SectionHeading
          index="01"
          label="SELECTED WORK"
          title="不是演示，而是真实进入业务流程的 AI 项目。"
          description="从问题定义、方案设计到 MVP 和上线复盘，我更关心 AI 能否稳定完成任务，以及它最终为客户创造了什么价值。"
        />
        <ProjectShowcase projects={profile.projects} />
      </section>

      <CapabilityMethod />

      <ClientDelivery />

      <section className="content-section section-shell" id="experience">
        <Timeline
          items={profile.timeline}
          earlierExperience={profile.earlierExperience}
          education={profile.education}
        />
      </section>

      <Toolkit items={profile.toolkit} />
      <OtherProjects projects={profile.otherProjects} />

      <ContactPanel />

      <footer className="site-footer section-shell">
        <span>© 2026 {profile.name}</span>
        <span>企业 AI 解决方案 · Agent 应用交付</span>
        <a href="#top">回到顶部 ↑</a>
      </footer>
    </main>
  );
}
