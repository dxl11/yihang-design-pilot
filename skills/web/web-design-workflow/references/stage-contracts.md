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

## page design → responsive design（available）

`04-page-design/<page-id>/page-design.md` 至少含：

- Overview（目标、类型、任务）  
- Structure（区块与信息层级理由）  
- Layout（继承系统）  
- Interaction（主 CTA 含成功/失败）  
- Content（占位与禁止编造声明）  
- Quality checklist  

`05-responsive-design/<page-id>/responsive-design.md` 至少含：视口/断点理由、布局转换、内容优先级、导航与组件、交互、验证清单（含 NOT TESTED）。  
无 page-design 不得定稿响应式。未跑浏览器不得宣称「已验证通过」。

## responsive → design review（available）

`05-responsive-design/<page-id>/responsive-design.md` 供审查对照跨屏意图。  

`06-design-review/<page-id>/design-review.md` 至少含：Evidence Coverage、九维状态、Issue（含严重度与整改）、Overall Result、Unverified Items。  

无截图不得 Visual 呈现 PASS；无浏览器不得交互/响应式运行 PASS；CRITICAL 确证不得 APPROVED。

## design review → web implementation（available）

`06-design-review/<page-id>/design-review.md` 的结论决定实现准入：

| 结论 | 实现 |
|---|---|
| APPROVED | 允许正式实现 |
| APPROVED_WITH_NOTES | 允许；NOTES → Pending |
| NEEDS_REVISION | 默认阻止正式实现；用户明示原型/局部 → RESTRICTED |
| BLOCKED | 阻止相关范围 |
| INSUFFICIENT_EVIDENCE | 不自动失败；规格足够部分可实现；呈现/运行 `NOT_VERIFIED` |

`07-web-implementation/<page-id>/implementation-report.md` 至少含：Project Discovery、Input Inventory、Readiness、Mapping、Fidelity、Verification（分类型）、Deviations、Pending、实际修改文件（或 NO_CODE_CHANGES / CASE_DEMO）。

- Design Review 负责审查设计；Web Implementation 负责实现；不得擅自推翻已批准设计。  
- 代码写入**用户项目**；报告写入 `07-web-implementation/`。  
- Build PASS ≠ 视觉 PASS；P2.4 Design Fidelity ≠ P2.5 Browser Visual Verification。  

## web implementation → web visual verification（available）

`07-web-implementation` 与可运行页面（或 MODE C 证据）供视觉验证。  

`08-web-visual-verification/<page-id>/visual-verification-report.md` 至少含：Readiness、Tool Mode、Viewport Matrix（追溯 05）、Screenshot Inventory、Load/Layout/Responsive/Interaction/A11y/Visual 分结果、Issue Register、Evidence Index、Final Decision、Limitations。  

- 视口矩阵继承 `05-responsive-design`，不得硬编码冒充设计规定。  
- MODE：AUTOMATED / BROWSER_ASSISTED / EVIDENCE_ONLY；Playwright 可选。  
- 工具缺失 → TOOL_NOT_AVAILABLE，**≠** 页面 FAIL；STARTUP_FAILED 独立记录。  
- 无参考图 → REFERENCE_IMAGE_NOT_AVAILABLE；不得声称设计稿匹配。  
- 无真实运行 → 不得 Browser/Visual PASS；CASE_DEMO 不得当生产证据。  
- 复测：FIXED 须有重新验证证据。  

## page design → HTML 实现（经 web-implementation）

- 入口行为与 CTA 去向可实现或标 BACKEND_REQUIRED  
- 文案非 Lorem；假数据未标 PLACEHOLDER/TODO 视为红灯  
- 窄屏主 CTA 行为与 `05-responsive-design` 一致或记偏差  
- 优先复用项目组件与主题变量  

## Review 清单（人工/Agent）

### Red

- 裂图 / 假 logo  
- 正文过小或对比不足（明显不可读）  
- 未遵守已批准方向的主色/字体配对  
- 无用户确认却宣称方向已定  
- 把 HYPOTHESIS 写成已验证用户研究  
- 将 planned Skill 伪造成已完成交付  
- 页面设计编造价格/评价并标为事实  
- 未测试却宣称响应式/WCAG/审查/实现/浏览器视觉已通过  
- 审查无证据却 APPROVED  
- NEEDS_REVISION 未授权却宣称生产级实现完成  
- CASE_DEMO 冒充生产部署或真实浏览器 PASS  
- 无参考图却声称设计稿匹配  
- 工具缺失却判页面视觉 FAIL  

### Yellow

- 模板装饰（无意义徽章、按钮尾箭头滥用）  
- 首屏堆满统计条而无题材锚点  
- IA 与 Brief 主转化不一致却未记录冲突  
- 验证页超出 Sitemap 未在 Overview 声明  
- READY_WITH_GAPS / READY_WITH_LIMITATIONS 未写明缺口影响  
- 仅桌面截图却暗示全视口已验证  
