# Enterprise AI Profile Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing single-page profile into the approved Linea Prompt-inspired Chinese enterprise AI portfolio, with four inline-expandable case studies and responsive recruiter-focused content.

**Architecture:** Keep the current Vinext/React static site and drive all public content from typed data in `content/profile.ts`. Server components render the page sections; client state is limited to the mobile navigation, contact copy action, and one-at-a-time project expansion. Styling remains in `app/globals.css`, organized by page section and shared design tokens.

**Tech Stack:** React 19, TypeScript, Vinext, CSS, Vitest, Node test runner, Codex Sites hosting.

---

## File structure

- `content/profile.ts`: typed public content for hero, metrics, four cases, capability evidence, delivery chain, experience, toolkit, other projects, and contact.
- `content/profile.test.ts`: content integrity and wording tests.
- `lib/projects.ts`: pure project expansion state helper.
- `lib/projects.test.ts`: expansion state behavior tests.
- `components/site-header.tsx`: floating navigation and mobile menu.
- `components/hero.tsx`: hero copy and UI-style portrait profile panel.
- `components/proof-metrics.tsx`: three-item dark proof strip.
- `components/project-showcase.tsx`: flagship + three-card layout and shared inline case detail.
- `components/capability-method.tsx`: four cross-project capability cards and reusable method flow.
- `components/client-delivery.tsx`: nine-step client delivery chain and grouped customer evidence.
- `components/timeline.tsx`: concise work and education timeline.
- `components/toolkit.tsx`: two-column product/technical capability table.
- `components/other-projects.tsx`: two lightweight AI practice cards.
- `components/contact-panel.tsx`: email, WeChat, and resume actions.
- `app/page.tsx`: homepage section composition.
- `app/globals.css`: Linea-inspired visual system, responsive layout, interaction, and reduced motion.
- `app/layout.tsx`: updated metadata and social copy.
- `public/profile-feature.jpg`: optimized approved portrait.
- `tests/rendered-html.test.mjs`: server-rendered content and source affordance checks.

### Task 1: Replace the content model with the approved homepage data

**Files:**
- Modify: `content/profile.test.ts`
- Modify: `content/profile.ts`

- [ ] **Step 1: Write failing content tests**

Replace the obsolete project and metric expectations with:

```ts
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
    { value: "7", label: "核心 AI Skill" },
    { value: "5", label: "独立客户 AI 实例" },
    { value: "77h+", label: "累计节省人工时间" },
  ]);

  for (const project of profile.projects) {
    for (const metric of project.metrics) {
      expect(metric.label.length).toBeGreaterThan(3);
    }
  }
});

it("uses the approved hero copy", () => {
  expect(profile.headline).toBe("把复杂业务变成可交付的 AI 能力");
  expect(profile.headlineEnglish).toBe(
    "Turning complex business needs into deployable AI capabilities.",
  );
});
```

- [ ] **Step 2: Run the tests and verify failure**

Run: `npm run test:unit -- content/profile.test.ts`

Expected: FAIL because the current profile has three obsolete projects, obsolete metrics, and no `headlineEnglish`.

- [ ] **Step 3: Define the complete typed profile model**

Create these reusable types in `content/profile.ts`:

```ts
export type EvidenceMetric = {
  value: string;
  label: string;
};

export type WorkflowNode = {
  title: string;
  detail?: string;
};

export type CaseStudy = {
  id: string;
  category: string;
  title: string;
  summary: string;
  proof: string;
  metrics: readonly EvidenceMetric[];
  overview: string;
  problem: string;
  judgment: string;
  solution: string;
  workflow: readonly WorkflowNode[];
  ownership: readonly { title: string; detail: string }[];
  results: readonly EvidenceMetric[];
  learning: string;
};
```

Populate `profile` with the approved hero copy, three hero metrics, the four case studies, four cross-project capabilities, six delivery stages, nine client-delivery steps, two main work experiences, education, six toolkit rows, and two other AI projects. Use the exact quantified wording from the design spec, including:

```ts
{
  title: "AI 品牌舆情与品牌洞察解决方案",
  metrics: [
    { value: "6 期", label: "已交付舆情月报" },
    { value: "约 98%", label: "客户平均内容采纳率" },
    { value: "2500 元 / 月", label: "司顺持续增值服务" },
  ],
}
```

Do not add unverified RAG, Java, TypeScript, or fabricated translation badcases.

- [ ] **Step 4: Run content tests**

Run: `npm run test:unit -- content/profile.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit the content model**

```bash
git add content/profile.ts content/profile.test.ts
git commit -m "feat: add approved enterprise AI portfolio content"
```

### Task 2: Add deterministic project expansion behavior

**Files:**
- Create: `lib/projects.test.ts`
- Create: `lib/projects.ts`
- Modify: `components/project-showcase.tsx`

- [ ] **Step 1: Write the failing state helper tests**

```ts
import { describe, expect, it } from "vitest";
import { nextExpandedProjectId } from "./projects";

describe("project expansion", () => {
  it("opens a selected project", () => {
    expect(nextExpandedProjectId(null, "creative-worker")).toBe("creative-worker");
  });

  it("closes the currently selected project", () => {
    expect(nextExpandedProjectId("creative-worker", "creative-worker")).toBeNull();
  });

  it("switches directly to a different project", () => {
    expect(nextExpandedProjectId("creative-worker", "brand-insight")).toBe(
      "brand-insight",
    );
  });
});
```

- [ ] **Step 2: Run the helper test and verify failure**

Run: `npm run test:unit -- lib/projects.test.ts`

Expected: FAIL because `lib/projects.ts` does not exist.

- [ ] **Step 3: Implement the helper**

```ts
export function nextExpandedProjectId(
  currentId: string | null,
  requestedId: string,
) {
  return currentId === requestedId ? null : requestedId;
}
```

- [ ] **Step 4: Run the helper test**

Run: `npm run test:unit -- lib/projects.test.ts`

Expected: PASS.

- [ ] **Step 5: Rebuild `ProjectShowcase` around the approved B layout**

Use one dark flagship card, a horizontal three-card grid, and one shared detail container below all cards. Start with `expandedId` set to `null`. Every button must use:

```tsx
<button
  type="button"
  aria-expanded={expandedId === project.id}
  aria-controls="expanded-case-study"
  onClick={() => setExpandedId((current) => nextExpandedProjectId(current, project.id))}
>
  {expandedId === project.id ? "收起完整案例" : "查看完整案例"}
</button>
```

Render the selected project once:

```tsx
{selectedProject ? (
  <article id="expanded-case-study" className="expanded-case-study">
    <CaseStudyDetails project={selectedProject} />
  </article>
) : null}
```

`CaseStudyDetails` must render overview, problem, judgment, solution, workflow, ownership, results, and learning. Workflow nodes use an ordered list so the content remains understandable without CSS.

- [ ] **Step 6: Run unit tests**

Run: `npm run test:unit`

Expected: PASS.

- [ ] **Step 7: Commit the interaction**

```bash
git add lib/projects.ts lib/projects.test.ts components/project-showcase.tsx
git commit -m "feat: add inline expandable case studies"
```

### Task 3: Build the approved hero, navigation, and proof strip

**Files:**
- Modify: `components/site-header.tsx`
- Modify: `components/hero.tsx`
- Modify: `components/proof-metrics.tsx`
- Create: `public/profile-feature.jpg`
- Modify: `app/layout.tsx`
- Modify: `tests/rendered-html.test.mjs`

- [ ] **Step 1: Update rendered HTML expectations first**

Replace the obsolete assertions with:

```js
assert.match(html, /把复杂业务变成可交付的 AI 能力/);
assert.match(
  html,
  /Turning complex business needs into deployable AI capabilities\./,
);
assert.match(html, /广告投放素材洞察数字员工/);
assert.match(html, /AI 品牌舆情与品牌洞察解决方案/);
assert.match(html, /多语言翻译与质量评估 Agent/);
assert.match(html, /AI 媒介流量洞察平台/);
assert.match(html, /7[^<]*核心 AI Skill/);
assert.match(html, /5[^<]*独立客户 AI 实例/);
assert.match(html, /77h\+[^<]*累计节省人工时间/);
assert.doesNotMatch(html, /把复杂业务，变成/);
```

- [ ] **Step 2: Run rendered tests and verify failure**

Run: `npm run build && node --test tests/rendered-html.test.mjs`

Expected: FAIL on the obsolete hero and project content.

- [ ] **Step 3: Optimize the approved portrait**

Run:

```bash
sips -s format jpeg -s formatOptions 88 -Z 1800 \
  /Users/leslie/Desktop/微信图片_2026-08-21_185040_766.jpg \
  --out public/profile-feature.jpg
```

Expected: `public/profile-feature.jpg` exists and is no larger than 1800px on its longest edge.

- [ ] **Step 4: Rebuild the header and hero markup**

`SiteHeader` must use links to `#projects`, `#method`, `#experience`, and `#contact`, plus the resume download CTA. `Hero` must include:

```tsx
<h1>{profile.headline}</h1>
<p className="hero-english">{profile.headlineEnglish}</p>
<p className="hero-position">企业 AI 解决方案｜AI 产品｜FDE</p>
```

The right side renders an `AI Solution Profile` window using `/profile-feature.jpg`, identity details, four capability chips, and representative project rows. Use a real `img` alt of `万舒畅在城市户外的个人照片`.

- [ ] **Step 5: Rebuild the proof strip**

Render exactly three horizontal items from `profile.heroMetrics`. Values use a separate element from labels so CSS can apply mint emphasis.

- [ ] **Step 6: Update page metadata**

Use title `万舒畅｜企业 AI 解决方案 · AI 产品 · FDE` and description `将复杂企业业务需求转化为可落地、可交付、可复制的 AI 产品与解决方案。` Update Open Graph and Twitter copy to the comma-free hero headline.

- [ ] **Step 7: Run build and rendered tests**

Run: `npm run build && node --test tests/rendered-html.test.mjs`

Expected: PASS.

- [ ] **Step 8: Commit the top-of-page rebuild**

```bash
git add components/site-header.tsx components/hero.tsx components/proof-metrics.tsx app/layout.tsx public/profile-feature.jpg tests/rendered-html.test.mjs
git commit -m "feat: rebuild Linea-inspired profile hero"
```

### Task 4: Build the cross-project capability and method sections

**Files:**
- Create: `components/capability-method.tsx`
- Modify: `app/page.tsx`
- Modify: `tests/rendered-html.test.mjs`

- [ ] **Step 1: Add failing rendered content assertions**

```js
assert.match(html, /从客户需求到 AI 落地/);
assert.match(html, /业务洞察/);
assert.match(html, /方案设计/);
assert.match(html, /快速搭建/);
assert.match(html, /交付与规模化/);
assert.match(html, /一套方法，适配不同企业 AI 场景/);
assert.match(html, /品牌舆情与洞察：从复杂企业数据到持续客户价值/);
assert.match(html, /翻译质量 Agent：生成与评测相互独立/);
assert.match(html, /媒介流量洞察平台：把专家分析方法做成 Web 产品/);
```

- [ ] **Step 2: Run rendered tests and verify failure**

Run: `npm run build && node --test tests/rendered-html.test.mjs`

Expected: FAIL because the new section is absent.

- [ ] **Step 3: Create `CapabilityMethod`**

Render four capability cards from `profile.capabilities`, followed by the six-stage shared method flow. Then render four compact cross-project evidence panels:

```tsx
<section id="method" className="capability-method section-shell">
  <SectionHeading eyebrow="ENTERPRISE AI CAPABILITIES" title="从客户需求到 AI 落地" />
  <div className="capability-grid">...</div>
  <ol className="method-flow">...</ol>
  <div className="cross-project-evidence">...</div>
</section>
```

Each evidence panel must use a different project. The flagship project may appear only in the final delivery/scale evidence panel.

- [ ] **Step 4: Place the section after projects**

Replace the old `CapabilityGrid` section in `app/page.tsx` with `CapabilityMethod` immediately after `ProjectShowcase`.

- [ ] **Step 5: Run rendered tests**

Run: `npm run build && node --test tests/rendered-html.test.mjs`

Expected: PASS.

- [ ] **Step 6: Commit the capability section**

```bash
git add components/capability-method.tsx app/page.tsx tests/rendered-html.test.mjs
git commit -m "feat: show cross-project enterprise AI capabilities"
```

### Task 5: Build delivery, experience, toolkit, and other practice sections

**Files:**
- Create: `components/client-delivery.tsx`
- Modify: `components/timeline.tsx`
- Create: `components/toolkit.tsx`
- Create: `components/other-projects.tsx`
- Modify: `app/page.tsx`
- Modify: `tests/rendered-html.test.mjs`

- [ ] **Step 1: Add failing rendered assertions**

```js
assert.match(html, /客户沟通/);
assert.match(html, /增购 \/ 规模化复制/);
assert.match(html, /Keeta · Anker · PUBGM/);
assert.match(html, /美的 · 吉利 · TCL · 司顺/);
assert.match(html, /蓝色光标 \/ 蓝瀚互动/);
assert.match(html, /DAU 稳定约 1000/);
assert.match(html, /AI 公关内容生产 Agent/);
assert.match(html, /14 篇真实 PR 稿件测试/);
```

- [ ] **Step 2: Run rendered tests and verify failure**

Run: `npm run build && node --test tests/rendered-html.test.mjs`

Expected: FAIL on missing lower-page content.

- [ ] **Step 3: Create `ClientDelivery`**

Render the nine steps as an ordered list and two customer groups. Do not render logos or remote images.

- [ ] **Step 4: Simplify `Timeline`**

Render two primary jobs, one collapsible earlier-experience disclosure using native `<details>`, and the ESCP education card. Keep each entry to one concise paragraph.

- [ ] **Step 5: Create `Toolkit`**

Render six rows from typed data. Do not add technologies absent from the spec.

- [ ] **Step 6: Create `OtherProjects`**

Render two equal cards with the exact 14-article/50% and DAU/20% outcomes.

- [ ] **Step 7: Compose the lower page**

Add sections in this order after `CapabilityMethod`:

```tsx
<ClientDelivery />
<Timeline items={profile.timeline} education={profile.education} />
<Toolkit items={profile.toolkit} />
<OtherProjects projects={profile.otherProjects} />
<ContactPanel />
```

- [ ] **Step 8: Run rendered tests**

Run: `npm run build && node --test tests/rendered-html.test.mjs`

Expected: PASS.

- [ ] **Step 9: Commit the lower page**

```bash
git add components/client-delivery.tsx components/timeline.tsx components/toolkit.tsx components/other-projects.tsx app/page.tsx tests/rendered-html.test.mjs
git commit -m "feat: add delivery experience and supporting work"
```

### Task 6: Apply the complete Linea-inspired visual system

**Files:**
- Modify: `app/globals.css`
- Modify: `tests/rendered-html.test.mjs`

- [ ] **Step 1: Add source-level style assertions**

```js
assert.match(css, /--page-bg:\s*#edf3f8/i);
assert.match(css, /--ink:\s*#0d1420/i);
assert.match(css, /--indigo:\s*#32389f/i);
assert.match(css, /--mint:\s*#94e2d5/i);
assert.match(css, /grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/i);
assert.match(css, /@media\s*\(max-width:\s*560px\)/i);
assert.match(css, /prefers-reduced-motion:\s*reduce/);
```

- [ ] **Step 2: Run rendered/source tests and verify failure**

Run: `npm run build && node --test tests/rendered-html.test.mjs`

Expected: FAIL because the current purple portfolio CSS does not define the approved design tokens and breakpoints.

- [ ] **Step 3: Replace global design tokens and base styles**

Start `:root` with:

```css
:root {
  --page-bg: #edf3f8;
  --ink: #0d1420;
  --muted: #687587;
  --indigo: #32389f;
  --indigo-active: #5157d8;
  --mint: #94e2d5;
  --line: rgba(61, 77, 99, 0.14);
  --panel: rgba(255, 255, 255, 0.72);
  --shell: min(1240px, calc(100vw - 40px));
}
```

Add the 40px low-opacity grid background, floating nav, compact mono labels, translucent panels, dark feature cards, and accessible focus states.

- [ ] **Step 4: Style each approved section**

Implement section-specific classes used by the components. Preserve these layout requirements:

```css
.selected-project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

@media (max-width: 560px) {
  .selected-project-grid {
    grid-template-columns: 1fr;
  }
}
```

The hero uses a wider text column so the Chinese headline stays on one line at desktop widths. The portrait image uses `object-fit: cover` with a face-centered `object-position`. Workflow diagrams stack vertically on mobile.

- [ ] **Step 5: Add reduced-motion handling**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 6: Run lint, unit tests, and build tests**

Run: `npm run lint && npm run test:unit && npm run build && node --test tests/rendered-html.test.mjs`

Expected: all commands exit 0.

- [ ] **Step 7: Commit the visual system**

```bash
git add app/globals.css tests/rendered-html.test.mjs
git commit -m "feat: apply Linea-inspired portfolio design system"
```

### Task 7: Finish contact behavior, documentation, and full verification

**Files:**
- Modify: `components/contact-panel.tsx`
- Modify: `README.md`
- Modify: `tests/rendered-html.test.mjs`

- [ ] **Step 1: Add final contact assertions**

```js
assert.match(html, /shuchangfr@163\.com/);
assert.match(html, /下载 PDF 简历/);
assert.doesNotMatch(html, /LinkedIn/);
assert.doesNotMatch(html, /15311670671/);
```

- [ ] **Step 2: Update `ContactPanel`**

Use the approved heading `如果你正在寻找能把企业 AI 方案真正做出来的人`. Keep email, WeChat copy, and resume download. Do not render LinkedIn without a verified URL.

- [ ] **Step 3: Replace the starter README**

Document the project as a Chinese enterprise AI portfolio with local commands:

````md
# 万舒畅企业 AI 个人主页

## Local development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run lint
npm test
```
````

- [ ] **Step 4: Run the complete automated verification**

Run: `npm run lint && npm test`

Expected: lint passes; Vitest, production build, and rendered HTML tests all pass.

- [ ] **Step 5: Run browser visual verification**

Start the site with `npm run dev`. Check 1440px, 768px, and 390px widths for:

- desktop single-line hero title;
- correct approved portrait crop;
- three horizontal selected-project cards at desktop and tablet;
- one-card layout only below 560px;
- all four cases open, switch, and close;
- no horizontal overflow;
- visible focus styles;
- reduced motion support;
- working email, WeChat copy, and resume download actions;
- no console errors or broken assets.

- [ ] **Step 6: Commit final polish**

```bash
git add components/contact-panel.tsx README.md tests/rendered-html.test.mjs
git commit -m "docs: finish profile site handoff"
```

- [ ] **Step 7: Inspect the final diff**

Run:

```bash
git status --short
git log --oneline -8
git diff HEAD~6..HEAD --stat
```

Expected: clean worktree, seven focused implementation commits after the design and plan commits, and only the intended homepage files changed.
