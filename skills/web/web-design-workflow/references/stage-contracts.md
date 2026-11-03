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

## design system → page design（planned）

- `03-design-system.md`  
- `design-tokens.json`（合法 JSON；语义化 color tokens）  
- 技术栈未定时保持框架无关映射说明  

## page design → review（planned）

- 入口 HTML 可打开  
- 文案非 Lorem  
- 继承已批准方向与 tokens  

## Review 清单（人工/Agent）

### Red

- 裂图 / 假 logo  
- 正文过小或对比不足（明显不可读）  
- 未遵守已批准方向的主色/字体配对  
- 无用户确认却宣称方向已定  
- 把 HYPOTHESIS 写成已验证用户研究  
- 将 planned Skill 伪造成已完成交付  

### Yellow

- 模板装饰（无意义徽章、按钮尾箭头滥用）  
- 首屏堆满统计条而无题材锚点  
- IA 与 Brief 主转化不一致却未记录冲突  
