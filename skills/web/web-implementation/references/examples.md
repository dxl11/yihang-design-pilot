# 示例

## 宿主提示词（生产用户项目）

> 请使用 `web-implementation`：在仓库 `../my-marketing-site` 实现 `home` 页。输入为 `design-output/01`–`06`。先 Project Discovery 与 Readiness；遵守 Design Review 准入；优先复用现有组件与主题变量；缺素材标 PLACEHOLDER；跑项目已有 `pnpm build`/`lint`；报告写入 `design-output/07-web-implementation/home/implementation-report.md`。无浏览器则 Visual=`NOT TESTED`。

## 边界

| 场景 | 期望 |
|---|---|
| 无前端项目 | `NO_PROJECT`；计划或经同意脚手架；不伪造 Runtime PASS |
| 成熟 React/Vite 项目 | 映射现有 Button/Layout；最小 diff |
| 设计输入缺 responsive | READY_WITH_GAPS；断点假设标 HYPOTHESIS |
| 规格冲突 | Inventory conflict；关键则 BLOCKED |
| 已有同名 Button | reuse，不平行造 |
| 需改 vite.config | 说明影响；否则确认 |
| 无后端报名 API | `BACKEND_REQUIRED` |
| 无真实图 | PLACEHOLDER + Pending |
| 无浏览器 | Visual / 部分 Interaction = NOT TESTED |

## 仓内贯穿案例

`examples/web/online-education-site/design-output/07-web-implementation/`  

**CASE_DEMO**：本 Skills 仓无营销前端工程与运行环境 → 仅实施报告与映射示意；**无**真实 build/浏览器 PASS。
