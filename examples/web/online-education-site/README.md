# 案例：启航学堂（在线教育品牌官网 · 从 0 建设）

贯穿验证：`web-design-brief` → `web-information-architecture` →（并行）`web-visual-direction` → `web-design-system` → `web-page-design` → `web-responsive-design`。

本目录为**仓库内固定样例交付物**，供自动化测试与人工审阅。Agent 在真实项目中应写到用户项目的 `design-output/`，而不是改本仓库样例。

## 材料故意留白

输入材料故意缺少：

- 量化转化漏斗数据  
- 正式用户访谈报告  
- 已定稿定价表  
- 完整品牌色规范  

用于检验 Skills 是否标注 `HYPOTHESIS` / `TODO`，而非编造调研结论。

## 目录

```text
00-project-intake.md          # 原始项目资料（模拟客户口述）
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
    home|course-detail|pricing/page-design.md
  05-responsive-design/
    _index.md
    home|course-detail|pricing/responsive-design.md
```

## 如何复现（人工）

1. Read `skills/web/web-design-brief/SKILL.md`，以 `00-project-intake.md` 为输入。  
2. Read `web-information-architecture`，以 Brief 为输入。  
3. Read `web-visual-direction`，产出三方向后选定（样例已选定方向 B）。  
4. Read `web-design-system`，以 Brief + IA + 批准方向生成系统与 tokens。  
5. Read `web-page-design`，设计首页、课程详情与价格策略页（定价未定 → 咨询导向，不编造标价）。  
6. Read `web-responsive-design`，基于 page-design 输出三页响应式规格（未跑浏览器标 NOT TESTED）。
