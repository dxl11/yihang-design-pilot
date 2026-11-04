# Issue Severity

| 级别 | 定义 | 典型例子 | 对结论 |
|---|---|---|---|
| `CRITICAL` | 阻断核心任务或严重误导/不可用 | 主 CTA 不可达；主内容不可读；关键假承诺呈现为事实 | → `BLOCKED`（有确证时） |
| `HIGH` | 严重损害主目标或主路径 | 移动主转化难找；核心导航失效；关键交互无状态导致误操作 | 通常 `NEEDS_REVISION` |
| `MEDIUM` | 体验受损但不一定阻断 | 层级乱、组件不一致、次路径不清 | `NEEDS_REVISION` 或 `APPROVED_WITH_NOTES` |
| `LOW` | 轻微打磨 | 局部对齐、次要文案 | 可 `APPROVED_WITH_NOTES` |
| `INFO` | 观察建议，非缺陷 | 可选增强 | 不单独否决 |

## 裁定提示

1. 先问：用户还能完成 Brief 定义的主任务吗？不能 → CRITICAL/HIGH。  
2. 规范违反但有变通且任务可完成 → 多为 MEDIUM。  
3. 仅规格缺口、无运行证据 → 用 Issue + 维度 NOT TESTED，勿升格为「已证实 CRITICAL」除非规格自相矛盾已足够。  
4. `CASE_DEMO` 问题在案例中须标明，避免与真实缺陷混淆。
