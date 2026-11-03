---
name: web-design-workflow
description: >-
  Orchestrates an end-to-end marketing website design workflow across brief, IA,
  brand read, visual direction, design system, page design, responsive checks,
  and review. Use when the user wants a full website or landing-page design
  process rather than a single atomic step, or asks to run the web design
  workflow.
metadata:
  ydp.kind: workflow
  version: "0.2.0"
---

# Web Design Workflow

## 定位

把多个专业 Skills **按阶段编排**，完成营销向网站 / 落地页从需求到可交付 HTML 的设计流程。

本 Skill **不是** Agent Runtime。宿主若不能自动调用其他 Skills，必须 **Read** 对应 `SKILL.md` 并按阶段执行。

## 触发场景

- 「按完整流程做官网 / 落地页」。  
- 需要确认节点（尤其是视觉方向与 IA）。  

## 不适用场景

- 只改一页颜色或文案。  
- 生产级 Web App 工程。  
- PPT / 品牌全书。

## 输入要求

| 输入 | 必填 | 说明 |
|---|---|---|
| 项目目标 | 是 | |
| 受众线索 | 是 | |
| 主要页面范围或「只要落地页」 | 是 | |
| 品牌资产 | 否 | |
| 是否跳过三方向 | 否 | 须用户明示并记录 |

## 阶段总览

| # | 阶段 | Skill | 状态 | 用户确认 |
|---|---|---|---|---|
| 1 | 设计简报 | `web-design-brief` | **available** | 建议确认待办项 |
| 2 | 信息架构 | `web-information-architecture` | **available** | 是（结构定稿时） |
| 3 | 品牌规范读取 | `brand-analysis` / 现有 brand 文件 | **planned**（可跳过） | 否 |
| 4 | 视觉方向 | `web-visual-direction` | **available** | **是** |
| 5 | 设计系统 | `web-design-system` | **available** | 否（大改品牌时建议确认） |
| 6 | 页面设计 | `web-page-design` | **planned** | 否 |
| 7 | 响应式 | `web-responsive-design` | **planned** | 否 |
| 8 | 质量审查 | `web-design-review` | **planned** | 否 |
| 9 | 修改迭代 | （回到 6–8 或 4–5） | — | 视红线 |
| 10 | 最终交付 | （本工作流收口） | — | 是 |

**并行**：阶段 2 与 4 可在 Brief 后并行；若并行，方向样例页应在 IA 定稿后复核。  
**顺序约束**：阶段 5 需要阶段 4 的批准（或显式跳过记录）；强烈建议已有阶段 1。

Available 路径：

- `skills/web/web-design-brief/SKILL.md`  
- `skills/web/web-information-architecture/SKILL.md`  
- `skills/web/web-visual-direction/SKILL.md`  
- `skills/web/web-design-system/SKILL.md`  

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
```

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
- **回退**：IA 大改后需复核视觉样例页与设计系统组件覆盖。

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

### 6 — 页面设计（planned）

- Fallback：按系统与方向实现约定页 HTML；真实文案；正文 ≥14px。

### 7 — 响应式（planned）

- Fallback：1440 / 375 检查记录。

### 8 — 质量审查（planned）

- Fallback：[stage-contracts.md](references/stage-contracts.md)；红灯不得交付。

### 9 — 迭代

- 优先修审查项；无确认不重开三方向。  
- 同红灯连续 3 次：升级询问用户。

### 10 — 最终交付

清单：Brief / IA / 方向批准 / 设计系统 /（未来）页面与审查报告；列出仍为 planned 的 Skill。

## 宿主兼容执行方式

1. 按阶段 Read 对应 `SKILL.md`。  
2. planned 仅用本文件 Fallback，并在交付中声明。  
3. 不依赖宿主私有多 Agent API。

## 质量检查（工作流级）

- [ ] Brief / IA / 方向 / 系统状态与上表一致（无把 planned 标成完成）  
- [ ] 视觉确认节点已满足  
- [ ] `design-output/` 文件可互相对照  
- [ ] 未关闭红灯不宣称完成  

## 失败处理

| 情况 | 处理 |
|---|---|
| 拒绝所有方向 | 回阶段 4 换骨架 |
| Brief 与 IA 冲突 | 停，先修订 Brief 或 IA |
| 无工具截图 | 记录限制，不假装已做响应式验收 |
