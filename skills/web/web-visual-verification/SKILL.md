---
name: web-visual-verification
description: >-
  Runs reproducible browser visual verification against a user's real web pages:
  readiness and tool-mode selection, viewport matrix from responsive specs,
  screenshots, layout/responsive/interaction/a11y checks, visual comparison when
  references exist, issue tracking and re-verification. Use after web-implementation
  when validating running pages—without inventing PASS, forcing Playwright, or
  claiming design-match without reference images.
metadata:
  ydp.kind: atomic
  version: "0.1.0"
---

# Web Visual Verification

## 定位

将**已实现的网页**与设计规格放入**真实浏览器环境**（或用户提供的等价证据）做可复现验证：视口矩阵截图、加载/布局/响应式/交互/基础无障碍、可选视觉对照、问题登记与复测。

本 Skill **是**：浏览器视觉验证方法论与宿主执行协议。  

本 Skill **不是**：独立 Playwright Runtime、云浏览器 SaaS、Agent Runtime、完整 WCAG 认证平台，或「随便截几张图就算通过」。

真正的浏览器操作由**宿主能力**、**用户项目已有自动化**或**可选辅助脚本**完成。

## 与 P2.4 的边界

| | P2.4 Implementation | P2.5 Visual Verification |
|---|---|---|
| 对象 | 代码与规格映射 | **已渲染/运行中的页面** |
| 证据 | 源码、构建日志 | 截图、BROWSER_RUN、布局指标 |
| 保真度 | Design Fidelity（代码层） | Browser Visual Verification |
| 可互相替代？ | **否** | **否** |

## 触发场景

- 「对实现后的首页做浏览器/响应式/截图验证」。  
- 工作流 Web Visual Verification 阶段。  
- 整改后要求复测。

## 不适用场景

- 尚无页面实现却要求「全站视觉已 VERIFIED」。  
- 要求强制给所有用户项目安装 Playwright。  
- 无浏览器/无证据却宣称 PASS。  
- 仅凭像素 diff 自动判设计 FAIL。

## 输入要求

| 输入 | 状态码 |
|---|---|
| 用户项目路径 / Base URL / 启动方式 | `INPUT_AVAILABLE` / `MISSING` / `INCOMPLETE` |
| 页面列表（page-id） | 必填意图 |
| `04-page-design` | 强烈建议 |
| `05-responsive-design` | **强烈建议**（视口矩阵来源） |
| `06-design-review` | 建议 |
| `07-web-implementation` | 建议 |
| 设计参考图 / 批准基准截图 | 可选；无则 `REFERENCE_IMAGE_NOT_AVAILABLE` |
| 验证范围与允许修改范围 | 建议 |

输入状态：`INPUT_AVAILABLE` | `INPUT_MISSING` | `INPUT_INCOMPLETE` | `INPUT_NOT_APPLICABLE`。  
细则：[verification-protocol.md](references/verification-protocol.md)。

## Verification Readiness

执行前判定：`READY` | `READY_WITH_LIMITATIONS` | `BLOCKED`。

检查：前端项目、依赖、启动方式、Base URL、浏览器、自动化工具、页面、响应式规格、参考图、关键交互要求。  
不满足时**禁止伪造**测试结果。见 [browser-tool-modes.md](references/browser-tool-modes.md)。

## 浏览器工具模式

| 模式 | 含义 |
|---|---|
| `AUTOMATED` (MODE A) | 项目/环境有 Playwright 或等效自动化 |
| `BROWSER_ASSISTED` (MODE B) | 宿主可操作浏览器，非完整测试框架 |
| `EVIDENCE_ONLY` (MODE C) | 仅用户截图/运行记录，无控制权 |

工具状态：`TOOL_NOT_AVAILABLE` | `BROWSER_NOT_AVAILABLE` | `PROJECT_NOT_RUNNABLE` | `STARTUP_FAILED` | `TEST_EXECUTION_FAILED` | `USER_EVIDENCE_ONLY`。  
**工具缺失 ≠ 页面 FAIL。** Playwright **可选**，优先复用用户已有工具。可选辅助：[`../../../scripts/web/visual-verify-capture.mjs`](../../../scripts/web/visual-verify-capture.mjs)（探测 Playwright，不强制向用户项目安装）。

## 执行流程

每 Stage：输入 · 动作 · 输出 · 完成条件 · 失败处理。可合理合并，职责不可缺。

### Stage 1 · Verification Request Analysis
范围、页面、是否复测、禁止不可逆业务操作。

### Stage 2 · Project Discovery
复用 P2.4 发现思路：路径、栈、启动脚本、已有 e2e。

### Stage 3 · Design Input Discovery
读 04–07；建 Inventory；冲突记冲突勿擅自裁定。

### Stage 4 · Verification Readiness
就绪判定；BLOCKED 则停。

### Stage 5 · Browser Tool Discovery
选 MODE A/B/C；记录工具与版本。

### Stage 6 · Test Environment Preparation
启动或连接 Base URL；`STARTUP_FAILED` 独立记录。

### Stage 7 · Viewport Matrix Preparation
**继承**各页 `05-responsive-design`；禁止机械套用 375/768/1024/1440 冒充设计规定。缺尺寸 → `VIEWPORT_SPEC_MISSING` + 假设。见 [verification-protocol.md](references/verification-protocol.md)。

### Stage 8–9 · Browser Execution & Screenshot Capture
稳定等待后截图；元数据齐全；不覆盖用户原图；默认不提交临时截图进 Git。

### Stage 10 · Page Load Verification
可达性、主体、空白页、加载失败。

### Stage 11 · Layout Verification
溢出、遮挡、重叠、裁切等。见 [verification-checks.md](references/verification-checks.md)。

### Stage 12 · Responsive Verification
逐条对照 05 规格：预期 / 实际 / 证据 / 状态。

### Stage 13 · Interaction Verification
规格内关键交互；不提交真实订单/支付；后端缺 → BLOCKED/PARTIAL。

### Stage 14 · Accessibility Verification
标题、键盘、名称、alt、明显语义；有 axe 则复用不强制装；**非**完整 WCAG 认证。

### Stage 15 · Visual Comparison
有参考图：布局/层级对照，像素 diff **不能单独**判 FAIL。无参考图：仅规格可测项 + `REFERENCE_IMAGE_NOT_AVAILABLE`。

### Stage 16 · Issue Classification
复用 CRITICAL–INFO；分类与复测状态见 [evidence-and-issues.md](references/evidence-and-issues.md)。

### Stage 17 · Verification Report
写入 `design-output/08-web-visual-verification/`。见 [output-schema.md](references/output-schema.md)。

### Stage 18 · Fix and Re-verification
改代码后必须重跑相关检查；状态 NEW/FIXED/REGRESSED/STILL_OPEN/NOT_RETESTED 须有证据。

## 验证状态

`PASS` | `FAIL` | `PARTIAL` | `NOT TESTED` | `BLOCKED` | `N/A`

- 无截图 ≠ Visual PASS  
- 无浏览器 ≠ Browser PASS  
- 工具缺失 ≠ 页面 FAIL  
- `STARTUP_FAILED` 独立记录  

## 最终结论

`VERIFIED` | `VERIFIED_WITH_ISSUES` | `NEEDS_FIXES` | `BLOCKED` | `INSUFFICIENT_EVIDENCE`  

须与证据范围一致（仅桌面截图 ≠ 全站 VERIFIED）。

## 工具调用

- 宿主浏览器 / 用户 Playwright / 可选 [`../../../scripts/web/visual-verify-capture.mjs`](../../../scripts/web/visual-verify-capture.mjs)。  
- **禁止**：伪造运行日志、假截图路径、把 CASE_DEMO 当真实证据。

## 输出要求

```text
design-output/08-web-visual-verification/
  _index.md
  <page-id>/visual-verification-report.md
  <run-id>/…   # 截图与元数据（用户项目或本地临时；默认不提交 Skills 仓）
```

报告 21 节见 [output-schema.md](references/output-schema.md)。

## 质量检查

见 [quality-checklist.md](references/quality-checklist.md)。

## 失败处理

| 情况 | 处理 |
|---|---|
| BLOCKED readiness | 停止；列缺失条件 |
| STARTUP_FAILED | 记启动失败；不做伪装视觉 FAIL |
| MODE C 仅证据 | 标明非自动化；可审查范围有限 |
| 规格冲突 | PARTIAL/BLOCKED + 待确认 |
| 复测无证据 | 不得标 FIXED |

## 与其他 Skills

| 关系 | Skill |
|---|---|
| 上游 | implementation、responsive、page-design、review |
| 编排 | `web-design-workflow` |

## 示例

见 [examples.md](references/examples.md)。仓内启航案例为 **CASE_DEMO**（无真实浏览器运行）。
