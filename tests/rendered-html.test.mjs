import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the approved recruiting profile", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="zh-CN"/i);
  assert.match(html, /<title>万舒畅｜企业 AI 解决方案 · AI 产品 · FDE<\/title>/i);
  assert.match(html, /把复杂业务变成可交付的 AI 能力/);
  assert.match(html, /Turning complex business needs into deployable AI capabilities\./);
  assert.match(html, /广告投放素材洞察数字员工/);
  assert.match(html, /AI 品牌舆情与品牌洞察解决方案/);
  assert.match(html, /多语言翻译与质量评估 Agent/);
  assert.match(html, /AI 媒介流量洞察平台/);
  assert.match(html, /11[^<]*核心 AI Skill/);
  assert.match(html, /11[^<]*服务客户/);
  assert.match(html, /100h\+[^<]*累计节省人工时间/);
  assert.match(html, /80%[^<]*电商项目覆盖率/);
  assert.match(html, /5000\+[^<]*累计处理素材/);
  assert.match(html, /30\+ 次[^<]*完整技能流程运行/);
  assert.match(html, /90 期[^<]*TCL 舆情日报持续交付/);
  assert.match(html, /12 期[^<]*美的舆情月报持续交付/);
  assert.match(html, /10 期[^<]*吉利舆情月报持续交付/);
  assert.match(html, /6 期[^<]*司顺舆情月报持续交付/);
  assert.match(html, /1 天 → 30 分钟[^<]*TCL 舆情日报制作周期/);
  assert.doesNotMatch(html, /把复杂业务，变成/);
  assert.match(html, /id="projects"/);
  assert.match(html, /从客户需求到 AI 落地/);
  assert.match(html, /业务洞察/);
  assert.match(html, /方案设计/);
  assert.match(html, /快速搭建/);
  assert.match(html, /交付与规模化/);
  assert.match(html, /一套方法，适配不同企业 AI 场景/);
  assert.match(html, /品牌舆情与洞察：从复杂企业数据到持续客户价值/);
  assert.match(html, /翻译质量 Agent：生成与评测相互独立/);
  assert.match(html, /媒介流量洞察平台：把专家分析方法做成 Web 产品/);
  assert.match(html, /客户沟通/);
  assert.match(html, /增购 \/ 规模化复制/);
  assert.match(html, /Keeta · Anker · PUBGM/);
  assert.match(html, /美的 · 吉利 · TCL · 司顺/);
  assert.match(html, /蓝色光标 \/ 蓝瀚互动/);
  assert.match(html, /DAU 稳定约 1000/);
  assert.match(html, /AI 公关内容生产 Agent/);
  assert.match(html, /14 篇真实 PR 稿件测试/);
  assert.match(html, /如果你正在寻找能把企业 AI 方案真正做出来的人/);
  assert.match(html, /shuchangfr@163\.com/);
  assert.match(html, /下载 PDF 简历/);
  assert.doesNotMatch(html, /LinkedIn/);
  assert.match(html, /id="experience"/);
  assert.match(html, /id="contact"/);
  assert.match(html, /og-profile\.png/);
  assert.doesNotMatch(html, /15311670671/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/);
});

test("ships the dedicated social sharing cover", async () => {
  await access(new URL("../public/og-profile.png", import.meta.url));
});

test("keeps interaction, privacy, and motion affordances in source", async () => {
  const [projects, contact, header, css, page, layout, packageJson] =
    await Promise.all([
      readFile(new URL("../components/project-showcase.tsx", import.meta.url), "utf8"),
      readFile(new URL("../components/contact-panel.tsx", import.meta.url), "utf8"),
      readFile(new URL("../components/site-header.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
      readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
      readFile(new URL("../package.json", import.meta.url), "utf8"),
    ]);

  assert.match(projects, /aria-expanded/);
  assert.match(projects, /aria-controls/);
  assert.match(contact, /aria-live="polite"/);
  assert.match(contact, /download/);
  assert.match(header, /aria-expanded/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media\s*\(max-width:\s*900px\)/);
  assert.match(css, /--page-bg:\s*#edf3f8/i);
  assert.match(css, /--ink:\s*#0d1420/i);
  assert.match(css, /--indigo:\s*#32389f/i);
  assert.match(css, /--mint:\s*#94e2d5/i);
  assert.match(css, /grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/i);
  assert.match(css, /@media\s*\(max-width:\s*560px\)/i);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
