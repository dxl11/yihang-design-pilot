# page-design.md 输出结构

文件头：

```markdown
# Page Design — <页面名> (<path>)

- Skill: web-page-design
- 日期: <ISO date>
- 页面类型: <type>
- 置信度: high | medium | low
- 上游: 01-brief / 02-ia / visual-direction / 03-design-system / tokens
```

## 必需大节

### 1. Overview

- 页面商业目标、用户目标、成功标准  
- 页面类型与选型理由  
- 主/次用户任务  
- 设计策略摘要（3–6 条）  
- 关键决策与假设（FACT/HYPOTHESIS/TODO）

### 2. Structure

- 区块顺序列表（含每块目标）  
- 信息层级 P0/P1/P2  
- **顺序理由**（为何不是别的顺序）  
- 与其他页面的入口/出口

### 3. Layout

- 容器与栅格（引用 token：如 `layout.container.max`）  
- 首屏结构（桌面/移动差异摘要；细节可留给 responsive Skill）  
- 间距与节奏（引用 `spacing.scale`）  
- 视觉重心与图文比  
- **声明**：未新增全局 token；例外仅页面局部说明

### 4. Interaction

对每个关键控件：触发、行为、成功、失败/空态、反馈。  
至少覆盖：主 CTA；若有表单则含校验与提交态。

### 5. Content

- 标题/副标题/主张结构（可给示例文案并标来源或 PLACEHOLDER）  
- 证明材料策略（仅真实可用来源）  
- 图片/图标要求与 alt  
- 禁止编造的数据清单

### 6. Quality checklist

勾选结果、未解决问题、风险、待确认事项。

## 多页批次

`04-page-design/_index.md` 列出 page-id、类型、路径、与 IA 关系。
