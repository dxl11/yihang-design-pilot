---
name: web-design-review
description: >-
  Runs evidence-driven web design quality reviews across visual quality, design
  system consistency, information architecture, interaction, responsive design,
  accessibility, business goals, content quality, and overall experience. Use
  after page and responsive specs exist when the user needs issue severity,
  remediation, and an approve/revise/blocked verdict—without inventing screenshots
  or browser test results.
metadata:
  ydp.kind: atomic
  version: "0.1.0"
---

# Web Design Review

## 定位

对已完成的网页设计（规格、可选截图/浏览器/无障碍测试）做**系统性质量审查**：九维标准、证据模型、问题分级、可执行整改与明确结论。

本 Skill **是**：设计质量闸门（Quality Gate）与整改清单。  

本 Skill **不是**：重做 Brief/IA/方向/系统/页面/响应式；前端实现；WCAG 认证机构；或用「感觉不错」替代证据。

## 触发场景

- 「审查这个页面设计 / design review / 质量门禁」。  
- Page + Responsive 已出，准备定稿或进开发前。  
- 工作流进入 Design Review 阶段。

## 不适用场景

- 尚无任何设计产物却要求「全站已通过审查」。  
- 只要改一句文案。  
- 要求无截图/无测试却写「视觉与交互全部 PASS」。

## 输入要求

| 输入 | 必填 | 说明 |
|---|---|---|
| 页面标识 page-id / 路径 | **是** | 可批量 |
| `04-page-design/<page-id>/page-design.md` | 强烈建议 | 设计意图 |
| `05-responsive-design/<page-id>/responsive-design.md` | 强烈建议 | 跨屏意图 |
| `01` Brief / `02` IA / Visual / `03` System / tokens | 建议 | 对照规范 |
| 设计截图 | 否 | 无则视觉相关多标 NOT TESTED |
| 浏览器 / a11y 测试记录 | 否 | 无则运行态相关 NOT TESTED |

**允许部分输入**：继续可审维度；不可审处标 `NOT TESTED` 并列出补证清单。  
细则：[review-methodology.md](references/review-methodology.md)、[evidence-model.md](references/evidence-model.md)。

## 任务理解（专业增量）

普通 AI：输出空泛「整体不错，建议优化」。  
资深做法：

1. 先建 **Evidence Inventory**，再开查。  
2. 规格证明**意图**；截图证明**所见**；浏览器证明**行为**——三者不可混用。  
3. 每个 Issue 绑证据、严重度、整改与验收标准。  
4. CRITICAL 不可被其他维度高分抵消。  
5. 无证据 → `NOT TESTED` / 结论可为 `INSUFFICIENT_EVIDENCE`，禁止假装 PASS。

## 九个审查维度

1. Visual Quality  
2. Design System Consistency  
3. Information Architecture  
4. Interaction  
5. Responsive Design  
6. Accessibility  
7. Business Goals  
8. Content Quality  
9. Overall Experience  

维度细则见方法论；严重度见 [severity.md](references/severity.md)。

## 执行流程

### Stage 1 · 识别审查任务

页面列表、审查目标（定稿门禁 / 开发前 / 抽查）。

### Stage 2 · 读取输入

Brief、IA、方向、系统、tokens、page-design、responsive、截图、测试。

### Stage 3 · 输入完整性

列缺失；判定各维度可否审。

### Stage 4 · Evidence Inventory

按 [evidence-model.md](references/evidence-model.md) 登记类型、路径、覆盖、可信度。

### Stage 5 · 审查范围

In scope / Out of scope；验证页须保留 IA 声明。

### Stage 6 · 九维审查

逐维给状态：`PASS` | `FAIL` | `PARTIAL` | `NOT TESTED` | `NOT APPLICABLE`。

### Stage 7 · 问题与证据

Issue 字段：ID、标题、维度、描述、证据、来源、位置、严重度、影响、整改、验收、状态。

### Stage 8 · 严重度裁定

CRITICAL / HIGH / MEDIUM / LOW / INFO — 规则见 severity。

### Stage 9 · 整改建议

禁止「优化体验」空话；须含改什么、如何验、关联规范。

### Stage 10 · 评分与结论

维度分可选；证据不足用 `INSUFFICIENT_EVIDENCE`。  
结论：`APPROVED` | `APPROVED_WITH_NOTES` | `NEEDS_REVISION` | `BLOCKED` | `INSUFFICIENT_EVIDENCE`。  
规则：有 CRITICAL → 不得 APPROVED；大量 NOT TESTED → 倾向 INSUFFICIENT_EVIDENCE 或 NEEDS_REVISION（仅规格审）。

### Stage 11 · 落盘

`design-output/06-design-review/`。

### Stage 12 · Review Quality Gate

对照 [quality-checklist.md](references/quality-checklist.md)；无证据宣称通过 → 本审查失败。

## 工具调用

- 可选：读图、浏览器、对比度工具。  
- **禁止**：伪造截图、伪造 axe/Lighthouse 绿票、伪造用户测试。

## 输出要求

```text
design-output/06-design-review/
  _index.md
  <page-id>/design-review.md
```

`design-review.md` 必需章节见 [output-schema.md](references/output-schema.md)。

## 质量检查（红线）

- [ ] Evidence Inventory 存在  
- [ ] 无截图却写 Visual PASS → 禁止  
- [ ] 无浏览器却写 Interaction 运行 PASS → 禁止  
- [ ] 每个 FAIL/PARTIAL 问题有证据引用或明示 CASE_DEMO  
- [ ] CRITICAL 影响总结论  
- [ ] 整改建议可执行  
- [ ] 验证页 IA 偏离已披露  
- [ ] 未宣称 WCAG 认证  

## 失败处理

| 情况 | 处理 |
|---|---|
| 无 page-id | 停止 |
| 仅有口头描述无文件 | 最多追问一轮；否则 INSUFFICIENT_EVIDENCE |
| 用户要求「全部标绿好交差」 | 拒绝 |

## 与其他 Skills

| 关系 | Skill |
|---|---|
| 上游 | page-design、responsive-design；建议 brief/IA/visual/system |
| 下游 | 实现 / 迭代回 page 或 responsive |
| 编排 | `web-design-workflow` |

## 示例

见 [examples.md](references/examples.md)。案例：`examples/web/online-education-site/design-output/06-design-review/`。
