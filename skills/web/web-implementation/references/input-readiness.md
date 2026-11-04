# Design Input Readiness

## 状态

| 状态 | 含义 |
|---|---|
| `READY` | 关键设计输入完整，可开始正式实现 |
| `READY_WITH_GAPS` | 有缺口，可在明确假设下局部实现；缺口与影响必须写入报告 |
| `BLOCKED` | 关键决策冲突/缺失，无法可靠实现 |

## READY（建议门槛）

至少具备：

- 可识别的页面目标与结构（page-design 或等价）  
- 可识别的视觉/系统约束（tokens 或明确 CSS 约定）  
- 无「多个已批准版本互相矛盾且无法裁定」  

强烈建议另有：responsive、review 结论非 BLOCKED。

## READY_WITH_GAPS

例如：缺响应式规格但可用系统断点+标 DEVIATED；缺真实文案用 PLACEHOLDER；缺图用占位并记 Pending；Review 为 `INSUFFICIENT_EVIDENCE` 但规格足够编码。

## BLOCKED

例如：无页面目标；无可识别模块结构；关键规范互斥；核心交互完全未定义且无法合理推断；多份「已批准」冲突且不能靠版本标签裁定。

**禁止**仅用文件 mtime 判断哪份已批准；优先 `direction-approved.md`、Review 结论、用户明示。

## Design Review 门禁（叠加）

| Review | 与 Readiness 关系 |
|---|---|
| APPROVED | 可与 READY 一并正式实现 |
| APPROVED_WITH_NOTES | 可实现；NOTES → Pending |
| NEEDS_REVISION | 默认正式实现 **BLOCKED**；用户明示原型/局部 → `RESTRICTED` + 未关 Issue |
| BLOCKED | 范围实现 BLOCKED |
| INSUFFICIENT_EVIDENCE | 不自动 = 设计失败；规格够则 READY_WITH_GAPS；呈现验证 `NOT_VERIFIED` |

## Inventory 字段

每个输入：路径、版本/标识、用途、状态（present / missing / conflict）、批准证据（若有）。

## 冲突处理

1. 明确批准 > 探索稿（如 `visual-directions.md`）。  
2. 最新有效批准版本 > 旧稿（须有版本/批准标记，非仅 mtime）。  
3. 记录冲突；可局部实现则勿整单阻断。  
4. 关键决策不明 → 问用户。  
5. 非关键细节 → 标 `HYPOTHESIS` 实现假设。
