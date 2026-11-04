---
name: web-implementation
description: >-
  Implements approved web page designs into a user's real project by discovering
  the stack, mapping design tokens and components to code, building pages with
  responsive and interaction behavior, protecting existing business code, running
  available build/test checks, and reporting fidelity deviations. Use after design
  review when coding marketing pages from design-output specs—without inventing
  backends, fake metrics, or unverified visual PASS.
metadata:
  ydp.kind: atomic
  version: "0.1.0"
---

# Web Implementation

## 定位

将已有设计规格（Brief → … → Page / Responsive / Review）落实为**用户项目中的真实网页代码**：发现技术栈、映射 Tokens/组件、实现页面与响应式/交互/无障碍、执行可用验证、记录偏差。

本 Skill **是**：设计→代码的专业实施方法论与宿主执行指南。  

本 Skill **不是**：Agent Runtime、网站托管、像素回归平台、SaaS，或把 Markdown「一键变成」未经验证的上线站。

真正的读写文件、终端、构建由**宿主**完成；本 Skill 规定做什么、按何顺序、如何验收与何时停。

## 触发场景

- 「按 design-output 实现首页/落地页代码」。  
- Design Review 后进入开发。  
- 工作流 Web Implementation 阶段。

## 不适用场景

- 尚无页面规格却要求「全站已实现并通过」。  
- 要求无项目发现就重写技术栈。  
- 要求虚构后端 API / 商业数据 / 未跑构建却标 PASS。  
- 浏览器视觉验证专责范围（见 `web-visual-verification`；可记录待测，不替代）。

## 输入要求

| 输入 | 必填 | 说明 |
|---|---|---|
| 用户项目根目录 / 实现目标路径 | **是** | 代码写入用户项目，**默认不**写入本 Skills 仓 |
| 页面范围（page-id 列表） | **是** | |
| `04-page-design/.../page-design.md` | 强烈建议 | |
| `05-responsive-design/...` | 强烈建议 | |
| `03-design-system` + `design-tokens.json` | 强烈建议 | |
| `06-design-review/...` | 强烈建议 | 准入与整改 |
| Brief / IA / Visual | 建议 | |
| 用户技术约束 | 否 | |

允许部分缺失：见 Readiness。细则见 references。

## Design Review 准入

| Review 结论 | 实施 |
|---|---|
| `APPROVED` | 可正式实现 |
| `APPROVED_WITH_NOTES` | 可实现；NOTES 写入报告 Pending |
| `NEEDS_REVISION` | **默认阻止**正式实现；用户明示「原型/局部」→ `RESTRICTED` 实现并列出未解 Issue |
| `BLOCKED` | 阻止相关范围 |
| `INSUFFICIENT_EVIDENCE` | 不自动当失败；可实现**规格已足够**部分，呈现/运行验证标 `NOT_VERIFIED` |

不得把 Review 的每一条 INFO 都变成强制代码任务。

## 任务理解（专业增量）

普通 AI：丢一个 HTML 模板。  
资深做法：

1. **先发现项目**，再写代码。  
2. **先映射再实现**；复用已有 Button/Layout。  
3. **最小改动**；高影响配置先说明。  
4. 规格意图 ≠ 已渲染像素；无截图不说像素一致。  
5. Build PASS ≠ 体验 PASS。  
6. 偏差可追踪（MATCHED / DEVIATED / …）。

## 执行流程

每 Stage：输入 · 动作 · 输出 · 完成条件 · 失败处理。

### Stage 1 · Implementation Request Analysis

目标页面、是否受限实现、用户硬约束。

### Stage 2 · Project Discovery

结构、栈、约定、保护面。见 [project-discovery.md](references/project-discovery.md)。  
**无前端项目**：可创建最小约定结构（需用户同意）或仅输出实施计划；标 `NO_PROJECT` / CASE 场景。

### Stage 3 · Design Input Discovery

读取 01–06 与 tokens；建 Inventory。

### Stage 4 · Input Readiness Assessment

`READY` | `READY_WITH_GAPS` | `BLOCKED`。见 [input-readiness.md](references/input-readiness.md)。

### Stage 5 · Design-to-Code Mapping

Tokens→变量、组件、区块→路由/文件。见 [design-to-code-mapping.md](references/design-to-code-mapping.md)。

### Stage 6 · Implementation Planning

每页模块、共享组件、文件清单、风险配置。

### Stage 7 · Token Implementation

映射/新建变量；禁止平行魔法色。

### Stage 8 · Component Implementation

复用优先；状态按规格。见 [component-page-implementation.md](references/component-page-implementation.md)。

### Stage 9 · Page Implementation

结构/内容；PLACEHOLDER；不编造评价与价格 FACT。

### Stage 10 · Responsive Implementation

落实 05 规格；断点冲突记偏差。

### Stage 11 · Interaction & Accessibility

导航/表单/状态；语义与焦点；无测不宣称 WCAG 认证。

### Stage 12 · Design Fidelity Review

对照规格。见 [design-fidelity-review.md](references/design-fidelity-review.md)。

### Stage 13 · Implementation Verification

复用项目 build/typecheck/lint/test；状态 PASS/FAIL/PARTIAL/NOT TESTED/BLOCKED。见 [verification.md](references/verification.md)。

### Stage 14 · Implementation Reporting

写入 `design-output/07-web-implementation/`（报告）；代码在用户项目。

## 代码保护（硬规则）

- 不覆盖无关业务、鉴权、接口、路由核心。  
- 高影响文件（package.json、lock、vite/webpack、tsconfig、env）修改须说明必要性。  
- 删除业务代码 / 换栈 / 改协议 → **暂停并请用户确认**。  
- 无后端 → 标 `BACKEND_REQUIRED`，不造假 API。

## 工具调用

- 宿主：读目录、编辑、运行 `pnpm`/`npm` 等项目脚本。  
- **禁止**：伪造构建日志、伪造浏览器截图结论、引入版权不明图库。

## 输出要求

**代码**：用户指定项目目录。  

**报告**（设计产物仓 / 用户 design-output）：

```text
design-output/07-web-implementation/
  _index.md
  <page-id>/implementation-report.md
```

报告章节见 [output-schema.md](references/output-schema.md)。  
可选：`implementation-plan.md`、`design-to-code-map.md`、`implementation-deviations.md`、`verification-report.md`（有独立价值时才拆）。

## 质量检查（红线）

见 [quality-checklist.md](references/quality-checklist.md)。

- [ ] 已做 Project Discovery（或明示无项目）  
- [ ] Readiness 已判定  
- [ ] Review 准入已遵守  
- [ ] Tokens/组件优先复用  
- [ ] 无虚构商业内容 / 假后端  
- [ ] 偏差表完整  
- [ ] 验证状态诚实（NOT TESTED ≠ PASS）  
- [ ] 未宣称 P2.5 视觉验证已完成  

## 失败处理

| 情况 | 处理 |
|---|---|
| BLOCKED readiness / Review BLOCKED | 停止相关实现 |
| NEEDS_REVISION 且用户未授权受限实现 | 停止正式实现 |
| 构建失败 | 修或记 FAIL；不假装 PASS |
| 栈无法识别 | 询问或最小假设并标 HYPOTHESIS |

## 与其他 Skills

| 关系 | Skill |
|---|---|
| 上游 | design-review、page-design、responsive、system、… |
| 下游 | 未来 visual verification（**planned**） |
| 编排 | `web-design-workflow` |

## 示例

见 [examples.md](references/examples.md)。仓内案例为 **CASE_DEMO 报告**（无生产前端工程）。
