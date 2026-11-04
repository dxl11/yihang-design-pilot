# 浏览器工具模式

## 优先级

1. 用户项目已有 Playwright / Cypress / 等价 e2e。  
2. 宿主浏览器操作能力（Cursor browser 等）。  
3. 用户提供截图与运行记录。  
4. 本仓可选辅助脚本（**不**强制安装依赖）。

Playwright 为**优先研究的可选工具**，不是全仓强制依赖。本 Skills 仓库 `package.json` **不**捆绑 Playwright。

## MODE A · AUTOMATED

适用：可定位 `playwright` / `@playwright/test` 或用户等效 CLI。

可执行：访问、截图、元素/布局测量、console/network（工具支持时）、交互、键盘、断言。

可选辅助：仓库根目录 `scripts/web/visual-verify-capture.mjs`（动态 `import('playwright')`；缺失退出 `TOOL_NOT_AVAILABLE`）。

## MODE B · BROWSER_ASSISTED

宿主能导航/点击/截图，但无完整测试框架。

必须分列：已执行操作 · 仅截图审查 · 无法检查项。不得把宿主一次快照写成全矩阵 AUTOMATED PASS。

## MODE C · EVIDENCE_ONLY

无法控制浏览器；仅有用户截图/日志。

可做基于证据的视觉审查。**不得**声称执行了浏览器自动化。状态码：`USER_EVIDENCE_ONLY`。

## 工具不可用码

| 码 | 含义 | 页面结论 |
|---|---|---|
| `TOOL_NOT_AVAILABLE` | 无自动化库/脚本 | ≠ FAIL |
| `BROWSER_NOT_AVAILABLE` | 无浏览器 | ≠ FAIL |
| `PROJECT_NOT_RUNNABLE` | 无前端/无法识别启动 | ≠ 视觉 FAIL |
| `STARTUP_FAILED` | 启动失败 | 独立记录 |
| `TEST_EXECUTION_FAILED` | 执行中失败 | 记失败原因 |
| `USER_EVIDENCE_ONLY` | 仅外部证据 | 限制审查范围 |

## 宿主诚实

不得宣称 Cursor / Claude Code / Codex **全部**完成真实浏览器验证，除非各宿主确有运行证据。未测宿主标 `NOT TESTED`。
