---
name: web-page-design
description: >-
  Turns page goals, information architecture, approved visual direction, and a
  design system into complete page-level design specs (structure, layout,
  interaction, content, and quality checks). Use when designing a home, product,
  course, pricing, or conversion page after brief/IA/direction/system exist, or
  when the user asks for page design without rebuilding the whole site system.
metadata:
  ydp.kind: atomic
  version: "0.1.0"
---

# Web Page Design

## 定位

将**单个（或一批）页面**的业务目标、用户任务、IA 位置与已批准视觉/系统设计，落实为可交接的**页面级设计规格**。

本 Skill **是**：页面任务分析、类型策略、信息层级、模块结构、布局执行、交互与状态、内容结构、信任/转化策略、页面自检。  

本 Skill **不是**：重新写 Design Brief、重做全站 Sitemap、重选全站视觉方向、重写全局 Design Tokens、完整响应式专项验收、设计审查定稿、前端工程实现，或伪造用户研究/评价/商业数据。

## 触发场景

- 「设计首页 / 课程详情 / 价格页 / 落地页结构」。  
- Brief + IA + 方向 + 设计系统已就绪，需要页面规格。  
- 工作流进入页面设计阶段。

## 不适用场景

- 只要改一句文案或一个按钮颜色。  
- 尚无任何业务目标且拒绝假设标记。  
- 要求直接交付生产级前端仓库。  
- 用本 Skill 替代 `web-design-review` 做最终红灯放行。

## 输入要求

| 输入 | 必填 | 说明 |
|---|---|---|
| 页面标识（名称/路径/类型） | **是** | 可一次指定多页，逐页输出 |
| `design-output/01-design-brief.md` | 强烈建议 | 缺失则标假设并降置信度 |
| `design-output/02-information-architecture.md` | 强烈建议 | 用于页面在站内角色与路径 |
| `design-output/visual-direction.md` + `direction-approved.md` | **是**（或显式跳过记录） | 无批准不得假装方向已定 |
| `design-output/03-design-system.md` + `design-tokens.json` | **是**（强烈） | 布局数值与组件**继承**系统；禁止另起全局 token 平行宇宙 |
| 页面特殊要求 / 参考站 / 素材 | 否 | |

已在项目文件中的信息**不得**要求用户重复粘贴。  
允许部分缺失：继续设计但标记 `FACT` / `HYPOTHESIS` / `TODO` 与影响。

细则：[methodology.md](references/methodology.md)、[page-types.md](references/page-types.md)。

## 任务理解（专业增量）

普通 AI：直接画「英雄区 + 三列卡片 + FAQ」。  
资深做法：

1. 先锁**页面任务与转化**，再排模块。  
2. 按**页面类型**换策略（首页 ≠ 价格页 ≠ 课程详情）。  
3. 解释信息顺序的**决策理由**，不只列区块名。  
4. 交互写清触发 → 响应 → 成功/失败状态。  
5. 视觉服务信息；禁止无任务的装饰卡片墙。  
6. 无证据不编造评价、人数、成功率、价格定稿。

## 执行流程

每一 Stage 均含：目标 · 输入 · 动作 · 输出 · 检查。

### Stage 1 · 读取项目资料

- **目标**：建立事实基线。  
- **输入**：上表文件。  
- **动作**：摘录与本页相关的目标、路径、token、禁止项；列出缺口。  
- **输出**：工作备忘（可内嵌于 overview）。  
- **检查**：未把缺失材料写成已读结论。

### Stage 2 · 确认页面目标与类型

- **目标**：定页面类型与主转化。  
- **动作**：对照 [page-types.md](references/page-types.md)；写商业目标 / 用户目标 / 网站角色。  
- **检查**：类型与 IA 路径一致，或显式说明偏离（如验证用定价页）。

### Stage 3 · 用户任务与决策路径

- **目标**：主/次任务、决策节点、阻碍。  
- **动作**：路径（进入 → 理解 → 信任/比较 → 行动）；标 FACT/HYPOTHESIS。  
- **检查**：至少一条可观察成功标准（或 TODO 指标）。

### Stage 4 · 信息层级

- **目标**：首屏必现 vs 延后；优先级与密度。  
- **动作**：P0/P1/P2 信息表 + **为何此顺序**。  
- **检查**：首屏不堆统计条装饰；核心主张可读。

### Stage 5 · 结构与模块

- **目标**：区块顺序与各块任务。  
- **动作**：结构图/列表；每块目标、内容、CTA、关联页。  
- **检查**：无任务模块删除或降级；避免重复首页式墙。

### Stage 6 · 布局方案

- **目标**：栅格、容器、首屏、节奏。  
- **动作**：引用 `layout.*` / `spacing` / breakpoints；说明对齐与图文比。  
- **检查**：数值来自 Design System；无擅自新增全局 token 名。

### Stage 7 · 应用方向与系统

- **目标**：视觉一致执行。  
- **动作**：映射 color/typography/components；遵守方向禁止项。  
- **检查**：非「白卡片 + 紫粉渐变」默认堆砌。

### Stage 8 · 交互与状态

- **目标**：关键控件行为完整。  
- **动作**：导航、主 CTA、表单等：触发、响应、成功、失败、反馈。  
- **检查**：按钮不只「好看」，有点击后去向。

### Stage 9 · 内容与素材

- **目标**：文案结构与素材约束。  
- **动作**：标题层级、占位规则、alt 要求；禁止伪造数据。  
- **检查**：占位明确标注；真实缺口 = TODO。

### Stage 10 · 质量自检

- **目标**：对照红线清单。  
- **动作**：填写 checklist；列风险与待确认。  
- **检查**：见 [quality-checklist.md](references/quality-checklist.md)。

### Stage 11 · 落盘

写入 `design-output/04-page-design/`（见输出要求）。

## 工具调用

- 可选：浏览参考站、读现有 HTML；无工具则声明限制。  
- **禁止**：伪造用户测试、热力、对比度仪器全站通过、客户好评原文。

## 输出要求

默认目录：

```text
design-output/04-page-design/
  _index.md                 # 多页批次时的索引（可选）
  <page-id>/
    page-design.md          # 推荐：单文件含下列全部必需章节
```

`page-design.md` **必需章节**（亦可拆成同名独立文件，但不得缺节）：

1. Overview（目标、类型、任务、策略、关键决策）  
2. Structure（区块、信息层级、模块说明）  
3. Layout（栅格、容器、间距、首屏、视觉层级）  
4. Interaction（行为、状态、CTA、异常）  
5. Content（文案结构、素材、占位说明）  
6. Quality checklist（自检、风险、TODO）

命名：`page-id` 用路径友好 slug（如 `home`、`course-detail`、`pricing`）。  
完整字段见 [output-schema.md](references/output-schema.md)。

## 质量检查（红线）

- [ ] 继承批准方向与 Design System / tokens（无平行全局色板）  
- [ ] 页面类型策略可辨，非一套模板套所有页  
- [ ] 信息顺序有理由；模块有任务目标  
- [ ] 主 CTA 有交互与成功/失败状态  
- [ ] 无伪造评价、价格定稿、用户研究「验证结论」  
- [ ] 缺失信息已标记且说明设计影响  
- [ ] a11y 有目标与待测项，未宣称已认证  
- [ ] 可交接给后续 responsive / review / 实现  

## 失败处理

| 情况 | 处理 |
|---|---|
| 无方向批准且无跳过记录 | 停止定稿；引导 `web-visual-direction` |
| 无设计系统 | 可出结构草案但布局数值标 HYPOTHESIS；建议先 `web-design-system` |
| Brief/IA 与页面目标冲突 | 暂停并列出冲突，不静默覆盖上游 |
| 用户要求编造好评/销量 | 拒绝写入 FACT；改占位或 TODO |

## 与其他 Skills

| 关系 | Skill |
|---|---|
| 上游 | `web-design-brief`、`web-information-architecture`、`web-visual-direction`、`web-design-system` |
| 下游 | `web-responsive-design`（available）、`web-design-review`（planned） |
| 编排 | `web-design-workflow` |

## 示例

见 [examples.md](references/examples.md)。仓库贯穿案例：`examples/web/online-education-site/design-output/04-page-design/`。
