# 示例

## 宿主提示词（真实用户项目）

> 请使用 `web-visual-verification`：项目 `../my-site`，启动 `pnpm dev`，验证 `home`。视口矩阵读取 `05-responsive-design/home`。优先用项目已有 Playwright；若无则用宿主浏览器（MODE B）或报告 TOOL_NOT_AVAILABLE。无设计参考图则标 REFERENCE_IMAGE_NOT_AVAILABLE。禁止真实下单。报告写入 `08-web-visual-verification/home/visual-verification-report.md`。未跑项标 NOT TESTED。

## 边界

| 场景 | 期望 |
|---|---|
| 无前端 / 无法启动 | PROJECT_NOT_RUNNABLE / STARTUP_FAILED；非伪装视觉 FAIL |
| 无 Playwright | 试 MODE B 或 C；可选脚本返回 TOOL_NOT_AVAILABLE |
| 无参考图 | 规格对照；禁止「匹配设计稿」 |
| 仅用户手机截图 | MODE C；部分项 NOT TESTED |
| 缺 05 视口数值 | VIEWPORT_SPEC_MISSING + 假设 |
| 整改后 | 复测证据齐全才 FIXED |

## 仓内案例

`examples/web/online-education-site/design-output/08-web-visual-verification/`  

**CASE_DEMO**：无营销前端、无真实浏览器 → 协议/矩阵/报告结构演示；结果为 `NOT TESTED` / `INSUFFICIENT_EVIDENCE` / `BLOCKED`（按页），**无** PASS 宣称。
