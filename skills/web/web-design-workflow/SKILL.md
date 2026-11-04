---
name: web-design-workflow
description: >-
  Orchestrates an end-to-end marketing website design workflow across brief, IA,
  brand read, visual direction, design system, page design, responsive checks,
  design review, and web implementation. Use when the user wants a full website
  or landing-page design-to-code process rather than a single atomic step, or
  asks to run the web design workflow.
metadata:
  ydp.kind: workflow
  version: "0.6.0"
---

# Web Design Workflow

## 定位

把多个专业 Skills **按阶段编排**，完成营销向网站 / 落地页从需求到页面规格、响应式、设计审查与**网页实现**的流程。

本 Skill **不是** Agent Runtime。宿主若不能自动调用其他 Skills，必须 **Read** 对应 `SKILL.md` 并按阶段执行。

## 触发场景

- 「按完整流程做官网 / 落地页（含实现）」。  
- 需要确认节点（尤其是视觉方向、IA、审查结论与实现范围）。  

## 不适用场景

- 只改一页颜色或文案。  
- 生产级 Web App 全栈业务重写。  
- PPT / 品牌全书。  
- 像素级视觉回归平台（属未来 Visual Verification）。

## 输入要求

| 输入 | 必填 | 说明 |
|---|---|---|
| 项目目标 | 是 | |
| 受众线索 | 是 | |
| 主要页面范围或「只要落地页」 | 是 | |
| 品牌资产 | 否 | |
| 是否跳过三方向 | 否 | 须用户明示并记录 |
| 用户前端项目路径（进入实现时） | 实现阶段建议 | 无项目则仅计划 / CASE_DEMO |

## 阶段总览

| # | 阶段 | Skill | 状态 | 用户确认 |
|---|---|---|---|---|
| 1 | 设计简报 | `web-design-brief` | **available** | 建议确认待办项 |
| 2 | 信息架构 | `web-information-architecture` | **available** | 是（结构定稿时） |
| 3 | 品牌规范读取 | `brand-analysis` / 现有 brand 文件 | **planned**（可跳过） | 否 |
| 4 | 视觉方向 | `web-visual-direction` | **available** | **是** |
| 5 | 设计系统 | `web-design-system` | **available** | 否（大改品牌时建议确认） |
| 6 | 页面设计 | `web-page-design` | **available** | 建议确认主转化文案与关键页范围 |
| 7 | 响应式 | `web-responsive-design` | **available** | 建议确认主转化在窄屏仍可达 |
| 8 | 质量审查 | `web-design-review` | **available** | 是（定稿/开发前建议确认结论） |
| 9 | 网页实现 | `web-implementation` | **available** | 是（范围、项目路径、受限实现授权） |
| 10 | 修改迭代 | （回到 6–9 或 4–5） | — | 视红线 |
| 11 | 最终交付 | （本工作流收口） | — | 是 |
| — | 视觉验证 | （未来 Skill） | **planned** | — |

**并行**：阶段 2 与 4 可在 Brief 后并行；若并行，方向样例页应在 IA 定稿后复核。  
**顺序约束**：阶段 5 需要阶段 4 的批准（或显式跳过记录）；阶段 6 强烈建议已有阶段 1、4、5（及建议 2）；阶段 7 强烈建议已有阶段 6 与 5；阶段 8 强烈建议已有阶段 6–7；阶段 9 强烈建议已有阶段 6–8，并遵守审查准入。

Available 路径：

- `skills/web/web-design-brief/SKILL.md`  
- `skills/web/web-information-architecture/SKILL.md`  
- `skills/web/web-visual-direction/SKILL.md`  
- `skills/web/web-design-system/SKILL.md`  
- `skills/web/web-page-design/SKILL.md`  
- `skills/web/web-responsive-design/SKILL.md`  
- `skills/web/web-design-review/SKILL.md`  
- `skills/web/web-implementation/SKILL.md`  

**Planned（未建空壳）**：Visual Verification；勿标 Available。

## 默认交付目录

```text
design-output/
  01-design-brief.md
  02-information-architecture.md
  visual-directions.md
  visual-direction.md
  direction-approved.md
  03-design-system.md
  design-tokens.json
  04-page-design/
    _index.md
    <page-id>/page-design.md
  05-responsive-design/
    _index.md
    <page-id>/responsive-design.md
  06-design-review/
    _index.md
    <page-id>/design-review.md
  07-web-implementation/
    _index.md
    <page-id>/implementation-report.md
```

**代码**写入用户前端项目，不默认放入 `design-output/`。

## 阶段详情

### 1 — 设计简报（available）

- **调用**：Read `web-design-brief` SKILL 全文执行。  
- **输出**：`design-output/01-design-brief.md`  
- **确认**：展示待确认事项；重大冲突则停。

### 2 — 信息架构（available）

- **调用**：`web-information-architecture`  
- **输入**：Brief  
- **输出**：`design-output/02-information-architecture.md`  
- **确认**：多页站点定稿前等待确认。  
- **回退**：IA 大改后需复核视觉样例页、设计系统组件覆盖与页面规格。

### 3 — 品牌读取（planned，可跳过）

- Fallback：最小 `brand-profile.md`；禁止伪造 logo/色来源。

### 4 — 视觉方向（available）

- **调用**：`web-visual-direction`  
- **输出**：`design-output/visual-directions.md` → 用户选 → `visual-direction.md` + `direction-approved.md`  
- **确认**：强制（除非用户原话跳过并记录）。

### 5 — 设计系统（available）

- **调用**：`web-design-system`  
- **输入**：Brief + 批准方向 + 建议 IA  
- **输出**：`03-design-system.md` + `design-tokens.json`  
- **注意**：无批准方向不得定稿。

### 6 — 页面设计（available）

- **调用**：Read `skills/web/web-page-design/SKILL.md` 全文执行。  
- **输入**：Brief、IA、批准方向、设计系统与 tokens；以及页面列表（名称/路径/类型）。  
- **输出**：`design-output/04-page-design/<page-id>/page-design.md`（及可选 `_index.md`）。  
- **缺失上游**：无方向批准则停止定稿；无系统则仅允许结构草案并标 HYPOTHESIS。  
- **确认**：建议确认页面范围与主 CTA 文案；不代替 Design Review。  
- **注意**：不在本阶段假装完成响应式专项或最终质量放行。

### 7 — 响应式（available）

- **调用**：Read `skills/web/web-responsive-design/SKILL.md` 全文执行。  
- **输入**：`04-page-design/<page-id>/page-design.md`、设计系统与 tokens；建议 Brief/IA/方向。  
- **输出**：`design-output/05-responsive-design/<page-id>/responsive-design.md`（及可选 `_index.md`）。  
- **缺失上游**：无 page-design 则停止定稿或仅输出风险清单并标假设。  
- **确认**：建议确认窄屏主 CTA 策略；**不**代替 Design Review；无浏览器跑测须标 NOT TESTED。  
- **回退**：响应式与页面结构冲突时回阶段 6（或 5 若 token 不足）。

### 8 — 质量审查（available）

- **调用**：Read `skills/web/web-design-review/SKILL.md` 全文执行。  
- **输入**：Brief/IA/方向/系统/tokens、page-design、responsive；可选截图与浏览器/a11y 记录。  
- **输出**：`design-output/06-design-review/<page-id>/design-review.md`（及可选 `_index.md`）。  
- **缺失证据**：相关维度标 NOT TESTED；不得无证宣称 Visual/交互运行 PASS。  
- **确认**：结论为 BLOCKED / NEEDS_REVISION / INSUFFICIENT_EVIDENCE 时须向用户展示；APPROVED 须有足够证据。  
- **回退**：按 Recommended Actions 回阶段 6–7（或更早）。

### 9 — 网页实现（available）

- **调用**：Read `skills/web/web-implementation/SKILL.md` 全文执行。  
- **输入**：用户项目路径、页面范围、`01`–`06` 设计产物；用户技术约束。  
- **输出**：用户项目中的代码 + `design-output/07-web-implementation/<page-id>/implementation-report.md`。  
- **准入**：  
  - `APPROVED` → 可正式实现  
  - `APPROVED_WITH_NOTES` → 可实现，NOTES 进 Pending  
  - `NEEDS_REVISION` → 默认阻止正式实现；用户明示原型/局部 → `RESTRICTED`  
  - `BLOCKED` → 阻止相关范围  
  - `INSUFFICIENT_EVIDENCE` → 规格足够部分可实现；视觉/运行验证 `NOT_VERIFIED`  
- **职责边界**：Review 审设计；Implementation 忠实实现；不得擅自推翻已批准设计；视觉回归属 **planned** Visual Verification。  
- **确认**：实现范围、项目路径、是否授权受限实现、高影响配置改动。  
- **回退**：保真度/构建失败按报告回 6–8 或修代码。

### 10 — 迭代

- 优先按审查 Issue 与实现偏差修订；无确认不重开三方向。  
- 同 CRITICAL/红灯连续 3 次：升级询问用户。

### 11 — 最终交付

清单：Brief / IA / 方向批准 / 设计系统 / 页面规格 / 响应式规格 / 审查报告 / 实施报告（及用户项目代码若有）；**不含**未交付的 Visual Verification。

## 宿主兼容执行方式

1. 按阶段 Read 对应 `SKILL.md`。  
2. planned 仅用本文件 Fallback，并在交付中声明。  
3. 不依赖宿主私有多 Agent API。

## 质量检查（工作流级）

- [ ] Brief / IA / 方向 / 系统 / 页面 / 响应式 / 审查 / 实现状态与上表一致  
- [ ] 视觉确认节点已满足  
- [ ] `design-output/` 文件可互相对照  
- [ ] 未跑浏览器却宣称响应式、审查或实现「视觉已验证通过」→ 红灯  
- [ ] 审查结论与实现准入一致  
- [ ] Visual Verification 仍为 planned，未标 available  
- [ ] 未关闭红灯不宣称完成  

## 失败处理

| 情况 | 处理 |
|---|---|
| 拒绝所有方向 | 回阶段 4 换骨架 |
| Brief 与 IA 冲突 | 停，先修订 Brief 或 IA |
| 页面规格与系统冲突 | 回阶段 5 或 6；禁止页面私自另起全局 token |
| 无工具截图 / 未跑浏览器 | 响应式与审查相关项标 NOT TESTED；审查结论勿 APPROVED 充数 |
| 实现缺项目 / 缺后端 | 标 NO_PROJECT / BACKEND_REQUIRED；不伪造 PASS |
| Review 未过且未授权受限实现 | 不进入正式阶段 9 |
