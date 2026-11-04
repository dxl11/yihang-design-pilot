# 证据、状态与问题

## 证据类型（扩展 P2.3）

优先复用：`DESIGN_SCREENSHOT`、`BROWSER_TEST`、`ACCESSIBILITY_TEST`、`USER_PROVIDED_EVIDENCE`、`CASE_DEMO`、`RESPONSIVE_DESIGN` 等。

P2.5 补充：

| 类型 | 含义 |
|---|---|
| `SCREENSHOT` | 本次验证截图 |
| `BROWSER_RUN` | 真实浏览器运行记录 |
| `CONSOLE` | 控制台采集 |
| `NETWORK` | 网络失败/状态摘要（脱敏） |
| `LAYOUT_METRIC` | 布局测量 |
| `INTERACTION_TEST` | 交互步骤与结果 |
| `A11Y_RESULT` | 基础 a11y 结果 |
| `VISUAL_COMPARISON` | 与参考图对照记录 |

## 证据字段

Evidence ID、Type、Test Run ID、Page ID、Viewport ID、Timestamp、Project Version/Commit、Browser Environment、Test Mode、Result、Path、Description、Limitation。  
必须标明是否真实执行。禁止虚构路径；禁止把 CASE_DEMO 当生产运行证据。

## 可信度

`DIRECT`（工具直接）| `OBSERVED`（宿主观察/真截图）| `USER_SUPPLIED` | `INFERRED`  

推断不得写成直接测试。

## 项状态

| 状态 | 含义 |
|---|---|
| `PASS` | 已执行且证据充分符合预期 |
| `FAIL` | 已执行且明确不符 |
| `PARTIAL` | 部分通过或有限制 |
| `NOT TESTED` | 未执行（≠ FAIL） |
| `BLOCKED` | 环境/工具/依赖阻碍（≠ FAIL） |
| `N/A` | 不适用（≠ PASS） |

## 严重度（复用 P2.3）

`CRITICAL` | `HIGH` | `MEDIUM` | `LOW` | `INFO`

## 问题分类

`PAGE_LOAD` · `CONSOLE_ERROR` · `NETWORK_ERROR` · `LAYOUT_OVERFLOW` · `ELEMENT_OVERLAP` · `CONTENT_MISSING` · `RESPONSIVE_DEVIATION` · `INTERACTION_FAILURE` · `ACCESSIBILITY_ISSUE` · `VISUAL_DEVIATION` · `DESIGN_FIDELITY_ISSUE`

## Issue 字段

ID、标题、页面、Viewport、位置、分类、严重度、预期、实际、复现步骤、证据、对应规格、影响、整改建议、验收标准、整改状态。

## 复测状态

`NEW` | `FIXED` | `REGRESSED` | `STILL_OPEN` | `NOT_RETESTED`  

代码改了 ≠ FIXED；须有重新验证证据。
