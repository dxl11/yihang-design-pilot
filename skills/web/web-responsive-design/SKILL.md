---
name: web-responsive-design
description: >-
  Turns page design specs, design system rules, and tokens into viewport-aware
  responsive design plans covering breakpoints, layout transforms, content
  priority, navigation, component and interaction changes, media, accessibility,
  and validation. Use after page design when adapting home, course, pricing, or
  other marketing pages across desktop, tablet, and mobile—without rebuilding
  the global design system.
metadata:
  ydp.kind: atomic
  version: "0.1.0"
---

# Web Responsive Design

## 定位

将已有 **Page Design**、**Design System** 与 **Design Tokens** 落实为跨视口的**响应式设计规格**：断点理由、布局转换、内容优先级、导航/组件/交互适配、字号间距与媒体、无障碍与边缘情况、验证策略。

本 Skill **是**：在基准页面规格之上定义「不同视口下如何变、为何变、如何验」。  

本 Skill **不是**：重写 Brief / IA / 视觉方向 / 全局 tokens / 整页设计；最终 Design Review；完整前端工程；或伪造浏览器实测结果。仅输出 Media Query 而不解释设计决策，视为不合格。

## 触发场景

- 「做响应式方案 / 适配平板手机 / 断点与布局转换」。  
- Page Design 已有，准备实现或审查前补齐跨屏规则。  
- 工作流进入 Responsive Design 阶段。

## 不适用场景

- 只要改一个按钮颜色。  
- 尚无任何页面结构却要求「全站响应式定稿」。  
- 用本 Skill 替代 `web-design-review` 做红灯放行。  
- 要求声称「已在真机通过 WCAG 认证」而无测试证据。

## 输入要求

| 输入 | 必填 | 说明 |
|---|---|---|
| `design-output/04-page-design/<page-id>/page-design.md` | **是**（强烈） | 基准页面规格 |
| `design-output/03-design-system.md` + `design-tokens.json` | **是**（强烈） | 断点/间距/字号继承处 |
| `design-output/01-design-brief.md` | 建议 | 任务与转化 |
| `02-information-architecture.md` | 建议 | 导航模型 |
| Visual Direction / 批准文件 | 建议 | 禁止项与气质 |
| 页面列表或 page-id | **是** | 可批量 |

允许缺失：继续但标 `FACT` / `HYPOTHESIS` / `TODO` 与影响。  
禁止要求用户重复粘贴已在 `design-output` 中的全文。

细则：[methodology.md](references/methodology.md)、[viewport-strategy.md](references/viewport-strategy.md)。

## 任务理解（专业增量）

普通 AI：`Desktop 3 栏 → Mobile 1 栏`。  
资深做法：

1. 先找**布局冲突与任务风险**（溢出、触达、决策信息被挤掉）。  
2. 断点服务冲突，而非设备营销名。  
3. 区分 **测试视口尺寸** 与 **CSS 断点 token**。  
4. 移动端不依赖 hover；关键 CTA 触控可达。  
5. 隐藏/折叠须有任务理由；不删决策必需信息。  
6. 无浏览器跑测则标 **NOT TESTED**，禁止写「已验证通过」。

## 执行流程

每 Stage：目标 · 输入 · 动作 · 输出 · 检查。

### Stage 1 · 读取资料

摘录页面目标、结构、布局、交互、tokens、导航；列缺口。

### Stage 2 · 任务与结构分析

页面类型、主任务、基准布局、组件清单。

### Stage 3 · 响应式风险

横向溢出、多栏挤压、表比较、粘性头、长标题、hover 依赖等。

### Stage 4 · 视口与断点策略

Wide / Desktop / Tablet / Mobile / Narrow；映射现有 `breakpoint.*`；写**为何在此切开**。见 [viewport-strategy.md](references/viewport-strategy.md)。

### Stage 5 · 布局转换

多栏→单栏、侧栏归并、容器/栅格、首屏重组；说明 UX 影响。

### Stage 6 · 内容优先级与顺序

P0/P1/P2 在窄屏的顺序、折叠、条件模块；禁止无理由删决策信息。

### Stage 7 · 导航与组件

Header/汉堡/粘性申请、卡片、表单、手风琴、定价比较等**本页实际出现**的组件行为。

### Stage 8 · 交互与状态

Hover 替代路径、触控目标、focus、展开/关闭、滚动表现。

### Stage 9 · Typography、Spacing、Media

字号阶梯、边距、图文比、`object-fit`/焦点；**不**另起冲突全局 token（例外须说明并 TODO 上游）。

### Stage 10 · Accessibility 与 Edge Cases

触控 ≥44px 目标、键盘、320 窄屏、横屏、放大、表溢出等。

### Stage 11 · 验证策略

设计检查 / 可自动化项 / 真浏览器项；未跑则 NOT TESTED。

### Stage 12 · 落盘

写入 `design-output/05-responsive-design/`。

## 工具调用

- 可选：浏览器 resize、截图、devtools；无则声明限制。  
- **禁止**：伪造截图结论、伪造 Lighthouse/axe「全绿」。

## 输出要求

```text
design-output/05-responsive-design/
  _index.md
  <page-id>/responsive-design.md
```

`responsive-design.md` 必需章节见 [output-schema.md](references/output-schema.md)：

1. Overview  
2. Viewport Strategy  
3. Breakpoint Rationale  
4. Layout Transformation  
5. Content Priority  
6. Navigation Adaptation  
7. Component Behavior  
8. Interaction Adaptation  
9. Typography & Spacing  
10. Responsive Media  
11. Accessibility  
12. Edge Cases  
13. Validation Checklist  
14. FACT / HYPOTHESIS / TODO  

## 质量检查（红线）

见 [quality-checklist.md](references/quality-checklist.md)。

- [ ] 继承 page-design 与 design tokens，无平行全局色板  
- [ ] 断点有布局/任务理由，非仅设备名  
- [ ] 布局转换含原因与 UX 影响  
- [ ] 内容隐藏/折叠有理由；决策信息保留可达  
- [ ] 移动导航与主 CTA 触控方案明确  
- [ ] 不依赖 hover 才能获得关键信息  
- [ ] 验证项区分已测 / NOT TESTED  
- [ ] 无伪造价格、评价、用户研究结论  
- [ ] 可交接实现与后续 Design Review  

## 失败处理

| 情况 | 处理 |
|---|---|
| 无 page-design | 停止定稿；引导 `web-page-design` 或仅出风险清单并标假设 |
| 无 tokens / 系统 | 可用页面内数值作 HYPOTHESIS；建议先补系统 |
| 用户要求「手机隐藏价格比较全部权益」 | 拒绝若损害决策；改为纵向卡片保留权益 |
| 要求宣称已 AA 认证 | 拒绝；只写目标与待测项 |

## 与其他 Skills

| 关系 | Skill |
|---|---|
| 上游 | `web-page-design`、`web-design-system`；建议 Brief / IA / Visual |
| 下游 | `web-design-review`（planned）、实现 |
| 编排 | `web-design-workflow` |

## 示例

见 [examples.md](references/examples.md)。案例：`examples/web/online-education-site/design-output/05-responsive-design/`。
