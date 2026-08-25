import { describe, expect, it } from "vitest";
import { profile } from "./profile";

describe("public profile content", () => {
  it("contains the approved four project cases", () => {
    expect(profile.projects.map((project) => project.title)).toEqual([
      "广告投放素材洞察数字员工",
      "AI 品牌舆情与品牌洞察解决方案",
      "多语言翻译与质量评估 Agent",
      "AI 媒介流量洞察平台",
    ]);
  });

  it("keeps every metric self-explanatory", () => {
    expect(profile.heroMetrics).toEqual([
      { value: "11", label: "核心 AI Skill" },
      { value: "11", label: "服务客户" },
      { value: "100h+", label: "累计节省人工时间" },
    ]);

    for (const project of profile.projects) {
      for (const metric of project.metrics) {
        expect(metric.label.length).toBeGreaterThan(3);
      }
    }
  });

  it("uses the latest digital-worker evidence", () => {
    expect(profile.projects[0].metrics).toEqual([
      { value: "7 个", label: "可复用核心 AI Skill" },
      { value: "80%", label: "电商项目覆盖率" },
      { value: "5000+", label: "累计处理素材" },
      { value: "30+ 次", label: "完整技能流程运行" },
      { value: "60 → 10 分钟", label: "单批素材处理时间" },
    ]);
  });

  it("uses the approved hero copy", () => {
    expect(profile.headline).toBe("把复杂业务变成可交付的 AI 能力");
    expect(profile.headlineEnglish).toBe(
      "Turning complex business needs into deployable AI capabilities.",
    );
  });

  it("does not publish a phone number", () => {
    const publicContact = JSON.stringify(profile.contact);
    expect(publicContact).not.toMatch(/1[3-9]\d{9}/);
    expect(profile.contact.email).toBe("shuchangfr@163.com");
    expect(profile.contact.wechat).toBe("wsc02116801");
  });

  it("gives every project complete case-study evidence", () => {
    for (const project of profile.projects) {
      expect(project.problem.length).toBeGreaterThan(20);
      expect(project.judgment.length).toBeGreaterThan(20);
      expect(project.solution.length).toBeGreaterThan(20);
      expect(project.ownership).toHaveLength(4);
      expect(project.results.length).toBeGreaterThan(0);
      expect(project.learning.length).toBeGreaterThan(20);
      expect(project.workflow.length).toBeGreaterThan(3);
    }
  });
});
