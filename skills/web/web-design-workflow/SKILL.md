---
name: web-design-workflow
description: >-
  Orchestrates an end-to-end marketing website design workflow across brief, IA,
  brand read, design system, visual direction, page design, responsive checks,
  and review. Use when the user wants a full website or landing-page design
  process rather than a single atomic step, or asks to run the web design
  workflow.
metadata:
  ydp.kind: workflow
  version: "0.1.0"
---

# Web Design Workflow

## 定位

把多个专业 Skills **按阶段编排**，完成营销向网站 / 落地页从需求到可交付 HTML 的设计流程。

本 Skill **不是** Agent Runtime，不提供私有调度 API。宿主若不能自动调用其他 Skills，必须 **Read** 对应 `SKILL.md` 并手工按阶段执行。

## 触发场景

- 「按完整流程做官网 / 落地页」。  
- 用户希望有确认节点（尤其是视觉方向）。  

## 不适用场景

- 只改一页颜色或文案（用原子 Skill 或直接改文件）。  
- 需要后端、鉴权、数据库的生产应用工程。  
- PPT / 品牌全书（用对应品类工作流）。

## 输入要求

| 输入 | 必填 | 说明 |
|---|---|---|
| 项目目标 | 是 | |
| 受众 | 是 | |
| 主要页面列表或「只要落地页」 | 是 | |
| 品牌资产 | 否 | 有则进入品牌读取阶段 |
| 是否跳过三方向 | 否 | 须用户明示并记录 |

## 阶段总览

| # | 阶段 | Skill | 状态 | 用户确认 |
|---|---|---|---|---|
| 1 | 设计简报 | `web-design-brief` | **planned** | 建议确认 |
| 2 | 信息架构 | `web-information-architecture` | **planned** | 是（结构变更时） |
| 3 | 品牌规范读取 | `brand-analysis` / 现有 `brand-profile.md` | **planned**（可跳过） | 否 |
| 4 | 设计系统（tokens/组件原则） | `web-design-system` | **planned** | 否 |
| 5 | 视觉方向 | `web-visual-direction` | **available** | **是** |
| 6 | 页面设计 | `web-page-design` | **planned** | 否（大改除外） |
| 7 | 响应式 | `web-responsive-design` | **planned** | 否 |
| 8 | 质量审查 | `web-design-review` | **planned** | 否 |
| 9 | 修改迭代 | （回到 6–8） | — | 视红线 |
| 10 | 最终交付 | （本工作流收口） | — | 是 |

`available` 路径：`skills/web/web-visual-direction/SKILL.md`。

## 阶段详情

### 1 — 设计简报（planned）

- **目标**：锁定目标、受众、成功标准、约束。  
- **Fallback**：在用户项目写 `design-brief.md`，字段：目标、受众、主转化、必含内容、不做列表、assumptions。  
- **输出**：`design-brief.md`  
- **确认**：用户未反对即可继续；若用户要改目标则停。

### 2 — 信息架构（planned）

- **目标**：页面地图与每页职责。  
- **Fallback**：写 `ia.md`（页面列表、首屏信息优先级、导航标签）。  
- **确认**：超过 1 页时展示 IA 后等待确认。  
- **回退**：IA 大改则作废未批准的视觉方向。

### 3 — 品牌读取（planned，可跳过）

- **若**用户提供品牌或具名产品：收集 logo/色/字体路径，写 `brand-profile.md` 最小集。  
- **若无**：标注 provisional，进入阶段 5 时由视觉方向建临时 tokens。  
- **禁止**：静默伪造品牌色来源。

### 4 — 设计系统（planned）

- **Fallback**：基于批准方向写 `design-system.md`（色板、字体、间距阶、按钮/链接原则）。  
- **注意**：无批准方向时不要先锁死装饰性组件。

### 5 — 视觉方向（available）

- **调用**：严格遵循 [`../web-visual-direction/SKILL.md`](../web-visual-direction/SKILL.md)。  
- **输入**：brief + IA + 可选 brand-profile。  
- **输出**：`visual-directions.md` → 用户选择 → `visual-direction.md` + `direction-approved.md`。  
- **确认**：**强制**（除非用户原话跳过并写入 `direction-approved.md`）。  
- **自动继续**：否。

### 6 — 页面设计（planned）

- **Fallback**：按批准方向实现约定页面的高保真 HTML（优先用户项目内文件），真实文案，禁止 Lorem。  
- **硬约束**：继承 `visual-direction.md`；正文 ≥14px；可点元素可点。  
- **输出**：`pages/*.html` 或约定入口 `index.html`。

### 7 — 响应式（planned）

- **Fallback**：至少按 1440 与 375 宽度检查布局；记录问题到 `responsive-notes.md`。  
- **工具**：P2 将接入仓库根目录下的 browser 截图脚本；P1 用宿主浏览器或截图工具。

### 8 — 质量审查（planned）

- **Fallback**：按 [stage-contracts.md](references/stage-contracts.md) 清单人工/Agent 检查，写 `review-report.md`（分 red/yellow）。  
- **红灯**：不得进入最终交付。

### 9 — 迭代

- 仅修 review 指向的问题；避免无确认重开三方向。  
- 同一红灯连续 3 次未解除：停止并询问用户取舍。

### 10 — 最终交付

整理 `delivery/` 或项目根约定：

- 简报 / IA / 方向批准 / 设计系统 / 页面 / review 报告  
- 已知限制与 planned Skill 列表  

## 宿主兼容执行方式

1. 打开本文件按阶段推进。  
2. 对 `available` Skill：Read 其 `SKILL.md` 全文并执行。  
3. 对 `planned` Skill：只用本文件 Fallback，并在交付中声明「原子 Skill 尚未入库」。  
4. 不要调用任何宿主私有「多 Agent 调度」接口作为前置条件。

## 质量检查（工作流级）

- [ ] 阶段顺序未被无记录地跳过（跳过须写理由）  
- [ ] 视觉方向确认节点已满足  
- [ ] 无将 planned 依赖标成已完成  
- [ ] 最终交付清单完整  
- [ ] `review-report.md` 无未关闭红灯  

## 失败处理

| 情况 | 处理 |
|---|---|
| 用户拒绝所有方向 | 回到阶段 5，换骨架重提，不在同骨架上微调交差 |
| 品牌与转化冲突 | 暂停，请用户选优先级，写入 brief |
| 工具/截图失败 | 记录失败；不假装已做响应式验收 |

## 关系

- 原子示例：`web-visual-direction`  
- 未来完整原子集见仓库规划目录（尚未全部创建，避免空壳 Skill）
