---
name: web-design-system
description: >-
  Builds an executable website design system with semantic design tokens,
  typography, spacing, layout, component inventory and states, responsive rules,
  and accessibility targets. Use after design brief and approved visual direction
  when the user needs tokens, component specs, or design-to-code rules for a
  marketing site.
metadata:
  ydp.kind: atomic
  version: "0.1.0"
---

# Web Design System

## 定位

将 Brief、IA（建议）与**已批准视觉方向**落实为可重复使用的设计系统：语义 Tokens、字体与间距、布局与断点、组件清单与状态、响应式与无障碍规则、Design-to-Code 约束。

本 Skill **不是**：全站页面视觉稿、完整组件库代码实现、或无依据地「随机选一套流行配色」。

## 触发场景

- 「建立设计系统 / design tokens / 组件规范」。  
- 视觉方向已选定，准备规模化页面。  
- 已有品牌色，需要网页语义化 token 层。

## 不适用场景

- 尚无 Brief 且无任何方向约束却要求「最终品牌系统」（先跑 brief / visual-direction）。  
- 只要一张海报色板。  
- 设计完整跨产品 Design System 治理（多品牌、多平台）——可做网站子集并声明边界。

## 输入要求

| 输入 | 必填 | 说明 |
|---|---|---|
| `design-output/01-design-brief.md` | 强烈建议 | |
| 批准的视觉方向 `design-output/visual-direction.md` 或 `visual-direction.md` + `direction-approved.md` | **是**（或用户明示跳过并记录） | 无则不得假装方向已定 |
| `design-output/02-information-architecture.md` | 建议 | 用于组件覆盖范围 |
| 品牌规范 / logo / 现站 | 否 | FACT 优先 |

无视觉方向：可输出「候选系统」但全文标 `HYPOTHESIS`，并列出方向依赖；**默认应先完成方向确认**。

## 任务理解（专业增量）

普通 AI：给几组 hex + 「用 Inter」。  
资深做法：

1. 先定系统边界与原则，再定 token。  
2. **语义色**（text/surface/border/status）绑定角色，而非 blue-1。  
3. 组件写清变体与状态，不只画默认外观。  
4. 响应式写行为，不只写断点数字。  
5. 无障碍写目标与检查项；无实测不宣称「已 AA 认证」。  
6. 技术栈未指定时保持实现无关；指定后再给映射建议。

见 [methodology.md](references/methodology.md)、[token-schema.md](references/token-schema.md)。

## 执行流程

### Step 1 · 边界与原则

网站类型、设备、覆盖/不覆盖、品牌硬约束、技术约束。

### Step 2 · Design Tokens

Color / Typography / Spacing / Radius / Shadow / Border / Layout / Breakpoint / Z-index。  
颜色语义命名；记录来源（品牌 / 批准方向 / provisional）。

### Step 3 · Typography System

字体选择依据、回退、层级、行高字重、中英文策略。

### Step 4 · Spacing 与 Layout

基础间距阶、容器/内容最大宽、栅格、区块留白、对齐。

### Step 5 · Responsive Rules

断点 + 各断点导航/栅格/字号/图片/组件行为。

### Step 6 · Component Inventory

按 IA 与站点类型选取真实需要的组件（不必凑齐百科全书）。参考清单见 methodology。

### Step 7 · 核心组件规格

对 P0 组件写：用途、结构、尺寸、变体、状态、交互、响应式、a11y。  
Button 至少覆盖 primary/secondary、hover/focus/active/disabled（loading 若需要）。

### Step 8 · Accessibility

对比度目标、焦点、键盘、表单标签与错误、语义结构。引用 WCAG 2.2 AA 为**目标**。

### Step 9 · Design-to-Code

未指定框架：给 CSS 变量 / token JSON 映射原则。  
已指定栈：给文件/命名建议，仍不写完整应用。

### Step 10 · 自检与落盘

## 工具调用

- 可选用对比度计算器；无则给出需人工复核项。  
- 禁止伪造「已用工具测过全站对比度通过」。

## 输出要求

```text
design-output/03-design-system.md
design-output/design-tokens.json
```

`design-tokens.json` 必须是可 `JSON.parse` 的对象，结构遵循 [token-schema.md](references/token-schema.md)。  
若信息不足以形成有效 JSON，可暂缓 JSON 并在 md 中说明原因（不得输出非法 JSON）。

md 必需章节见 [output-schema.md](references/output-schema.md)。

## 质量检查（红线）

见 [quality-checklist.md](references/quality-checklist.md)。

- [ ] 存在批准方向依据或显式跳过记录  
- [ ] 颜色以语义 token 为主  
- [ ] Typography 层级清晰  
- [ ] Spacing 有尺度  
- [ ] 至少 3 个 P0 组件含状态  
- [ ] 响应式含行为描述  
- [ ] a11y 有目标与待测项  
- [ ] `design-tokens.json` 可解析（若声明已生成）  

## 失败处理

| 情况 | 处理 |
|---|---|
| 无方向批准 | 停止定稿系统；引导 `web-visual-direction` |
| 品牌色与对比度冲突 | 给合规备选并请确认，不擅自改品牌主色用途 |
| 用户只要「一套流行色」 | 拒绝无业务依据的最终系统；可给探索稿并标假设 |

## 与其他 Skills

| 上游 | `web-design-brief`、`web-visual-direction`（批准）、建议 `web-information-architecture` |
|---|---|
| 下游 | 未来 `web-page-design` / `web-responsive-design` |
| 编排 | `web-design-workflow` |

## 示例

见 [examples.md](references/examples.md)。
