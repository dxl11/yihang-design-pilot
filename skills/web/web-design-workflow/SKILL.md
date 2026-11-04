---
name: web-design-workflow
description: >-
  Orchestrates an end-to-end marketing website design workflow across brief, IA,
  brand read, visual direction, design system, page design, responsive checks,
  design review, web implementation, and browser visual verification. Use when
  the user wants a full website or landing-page design-to-code-and-verify process
  rather than a single atomic step, or asks to run the web design workflow.
metadata:
  ydp.kind: workflow
  version: "0.7.0"
---

# Web Design Workflow

## 定位

把多个专业 Skills **按阶段编排**，完成营销向网站 / 落地页从需求到页面规格、响应式、设计审查、网页实现与**浏览器视觉验证**的流程。

本 Skill **不是** Agent Runtime。宿主若不能自动调用其他 Skills，必须 **Read** 对应 `SKILL.md` 并按阶段执行。

## 触发场景

- 「按完整流程做官网 / 落地页（含实现与浏览器验证）」。  
- 需要确认节点（视觉方向、IA、审查、实现范围、验证范围）。  

## 不适用场景

- 只改一页颜色或文案。  
- 生产级 Web App 全栈业务重写。  
- PPT / 品牌全书。  
- 独立云视觉回归 SaaS / Agent Runtime。

## 输入要求

| 输入 | 必填 | 说明 |
|---|---|---|
| 项目目标 | 是 | |
| 受众线索 | 是 | |
| 主要页面范围或「只要落地页」 | 是 | |
| 品牌资产 | 否 | |
| 是否跳过三方向 | 否 | 须用户明示并记录 |
| 用户前端项目路径 | 实现/验证阶段建议 | 无项目则仅计划 / CASE_DEMO |
| Base URL / 启动方式 | 验证阶段建议 | 缺失则验证 BLOCKED / MODE C |

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
| 10 | 视觉验证 | `web-visual-verification` | **available** | 是（范围、工具模式、复测授权） |
| 11 | 修改迭代 | （回到 6–10 或 4–5） | — | 视红线 |
| 12 | 最终交付 | （本工作流收口） | — | 是 |

**并行**：阶段 2 与 4 可在 Brief 后并行。  
**顺序约束**：阶段 5 需阶段 4 批准；阶段 6–8 同前；阶段 9 遵守审查准入；阶段 10 强烈建议已有阶段 7–9 产物与可运行页面（或 MODE C 证据）。

Available 路径：

- `skills/web/web-design-brief/SKILL.md`  
- `skills/web/web-information-architecture/SKILL.md`  
- `skills/web/web-visual-direction/SKILL.md`  
- `skills/web/web-design-system/SKILL.md`  
- `skills/web/web-page-design/SKILL.md`  
- `skills/web/web-responsive-design/SKILL.md`  
- `skills/web/web-design-review/SKILL.md`  
- `skills/web/web-implementation/SKILL.md`  
- `skills/web/web-visual-verification/SKILL.md`  

**Planned（未建空壳）**：品牌读取等非 Web 视觉验证能力；勿另起空壳。

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
  05-responsive-design/
  06-design-review/
  07-web-implementation/
  08-web-visual-verification/
    _index.md
    <page-id>/visual-verification-report.md
```

代码写入用户前端项目；截图产物默认在用户项目/临时目录，**勿**把含隐私的截图提交进 Skills 仓。

## 阶段详情

### 1–8

同既有 Brief → IA → Brand(planned) → Visual → System → Page → Responsive → Design Review（细节见各 Skill；契约见 `references/stage-contracts.md`）。

### 9 — 网页实现（available）

- **调用**：`web-implementation`  
- **输出**：用户项目代码 + `07-web-implementation/...`  
- **准入**：`APPROVED` / `APPROVED_WITH_NOTES` 可正式实现；`NEEDS_REVISION` 默认阻止（可 RESTRICTED）；`BLOCKED` 阻止；`INSUFFICIENT_EVIDENCE` 可规格层实现。  
- **边界**：Design Fidelity ≠ 浏览器视觉验证。

### 10 — 视觉验证（available）

- **调用**：Read `skills/web/web-visual-verification/SKILL.md` 全文执行。  
- **输入**：用户项目 / Base URL、页面范围、`04`–`07`、可选参考图与用户截图。  
- **输出**：`design-output/08-web-visual-verification/<page-id>/visual-verification-report.md`（及 run 产物）。  
- **调用条件**：有可验证页面或 MODE C 证据；Readiness 非 BLOCKED（或仅输出阻塞报告）。  
- **工具**：MODE A/B/C；Playwright 可选；缺失 → TOOL_NOT_AVAILABLE，**≠** 页面 FAIL。  
- **失败处理**：STARTUP_FAILED 独立记录；证据不足 → INSUFFICIENT_EVIDENCE；问题 → NEEDS_FIXES 后回 9/6–8 再复测。  
- **确认**：验证范围、不可逆操作禁令、复测授权。

### 11 — 迭代

优先按验证 Issue / 审查 Issue 修订；复测须有证据才标 FIXED。

### 12 — 最终交付

清单含实施报告与视觉验证报告（若执行）；无浏览器跑测的项须仍为 NOT TESTED。

## 宿主兼容执行方式

1. 按阶段 Read 对应 `SKILL.md`。  
2. planned 仅用 Fallback 并声明。  
3. 不依赖宿主私有多 Agent API。  
4. 不强制用户项目安装本仓未声明的依赖。

## 质量检查（工作流级）

- [ ] 阶段状态与上表一致  
- [ ] P2.4 与 P2.5 职责未混淆  
- [ ] 未跑浏览器却宣称视觉验证通过 → 红灯  
- [ ] Visual Verification 已为 available（本版本）  
- [ ] 未关闭红灯不宣称完成  

## 失败处理

| 情况 | 处理 |
|---|---|
| 实现缺项目 | NO_PROJECT；验证多为 BLOCKED / CASE_DEMO |
| 验证工具缺失 | MODE B/C 或 TOOL_NOT_AVAILABLE；不伪造 PASS |
| 验证发现 CRITICAL | NEEDS_FIXES；回实现/规格 |
| Review 未过且未授权 | 不进入正式实现；验证亦受限 |
