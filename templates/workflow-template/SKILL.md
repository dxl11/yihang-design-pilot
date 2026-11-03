---
name: workflow-template
description: >-
  Template for authoring a workflow skill that orchestrates multiple atomic
  design skills. Use when creating a new *-workflow skill; not for running
  end-user design jobs by itself until customized.
metadata:
  ydp.kind: workflow
  ydp.template: "true"
---

# \<Workflow Display Name\>

> 复制为 `skills/<domain>/<name>-workflow/` 后替换占位符。

## 定位

说明本工作流交付的完整成果类型（如营销站点、路演 PPT），以及**不**包含的范围。

## 触发场景

- …

## 不适用场景

- …

## 总览阶段

| # | 阶段 | Skill | 状态 | 用户确认 |
|---|---|---|---|---|
| 1 | … | `skill-name` | available / planned | 是/否 |

状态说明：`available` = 仓库已有 Skill；`planned` = 尚未实现，须走 fallback。

## 阶段详情

### 阶段 1 — \<名称\>

- **目标**：  
- **输入**：  
- **调用**：`skills/.../SKILL.md`（或 planned fallback）  
- **输出**：  
- **确认**：  
- **失败回退**：  

### 阶段 2 — …

（按同样结构继续）

## 宿主无法自动调用其他 Skill 时

1. 使用 Read 工具打开上表路径中的 `SKILL.md`。  
2. 严格按其输入/输出执行。  
3. 产物写入用户项目约定路径后，再进入下一阶段。

## 最终交付

- [ ] …  
- [ ] review 报告  
- [ ] 已知限制列表  

## 质量检查

- [ ] 方向确认记录存在（如需要）  
- [ ] 无 planned 依赖被假装为已完成  

## 失败处理

见 [stage-contracts.md](references/stage-contracts.md)。
