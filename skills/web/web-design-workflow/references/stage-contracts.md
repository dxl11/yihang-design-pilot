# Web Design Workflow · 阶段交接契约

默认目录：`design-output/`。

## brief → IA / visual direction

`01-design-brief.md` 至少含：业务/用户/网站目标、受众线索、主转化、In/Out of scope、待确认事项。关键结论须可区分 FACT / HYPOTHESIS。

## IA → design system / page design

`02-information-architecture.md` 至少含：内容盘点、Sitemap、导航、核心用户路径、页面优先级。

## visual direction → design system / page design

必须存在：

- `direction-approved.md`（用户原话或明示跳过理由）  
- `visual-direction.md`（色、字、骨架、图像语言、禁止项）  

`visual-directions.md` 为探索稿，不定稿依据。

## design system → page design

- `03-design-system.md`  
- `design-tokens.json`（合法 JSON；语义化 color tokens）  
- 页面设计必须**引用**上述 tokens，不得另起全局平行色板  

## page design → responsive / review（后两者 planned）

`04-page-design/<page-id>/page-design.md` 至少含：

- Overview（目标、类型、任务）  
- Structure（区块与信息层级理由）  
- Layout（继承系统）  
- Interaction（主 CTA 含成功/失败）  
- Content（占位与禁止编造声明）  
- Quality checklist  

无完整页面规格时，planned 的 responsive/review Fallback 不得宣称「页面设计已完成」。

## page design → HTML 实现（非本仓库 Skill）

- 入口行为与 CTA 去向可实现  
- 文案非 Lorem；假数据未标 PLACEHOLDER/TODO 视为红灯  

## Review 清单（人工/Agent）

### Red

- 裂图 / 假 logo  
- 正文过小或对比不足（明显不可读）  
- 未遵守已批准方向的主色/字体配对  
- 无用户确认却宣称方向已定  
- 把 HYPOTHESIS 写成已验证用户研究  
- 将 planned Skill 伪造成已完成交付  
- 页面设计编造价格/评价并标为事实  

### Yellow

- 模板装饰（无意义徽章、按钮尾箭头滥用）  
- 首屏堆满统计条而无题材锚点  
- IA 与 Brief 主转化不一致却未记录冲突  
- 验证页超出 Sitemap 未在 Overview 声明  
