---
name: skill-template
description: >-
  Template for authoring an atomic professional design skill in yihang-design-pilot.
  Use when creating a new independent skill directory from the repository template;
  not for end-user design tasks.
metadata:
  ydp.kind: atomic
  ydp.template: "true"
---

# \<Skill Display Name\>

> 复制本目录为 `skills/<domain>/<skill-name>/`，将 `name` 改为与目录名一致，删除模板说明后填写真实规则。

## 定位

用一两句话说明本 Skill **只**解决什么专业问题。

## 触发场景

- …

## 不适用场景

- …

## 输入要求

| 输入 | 必填 | 说明 |
|---|---|---|
| 设计目标 / 受众 | 是 | |
| 品牌资产 | 否 | 有则遵守，无则诚实占位 |

## 任务理解

1. 重述目标与约束。  
2. 列出 assumptions（若用户未回复）。  
3. …

## 执行流程

1. …  
2. …  
3. …

## 工具调用

- 知识：`knowledge/...`（若需要）  
- 脚本：`scripts/...`（若需要）  
- 上游 Skill：…

细则见 [methodology.md](references/methodology.md)。

## 输出要求

在用户项目中写入：

- `output-name.md` — 字段：…

## 质量检查（红线）

- [ ] …  
- [ ] …

## 失败处理

| 情况 | 处理 |
|---|---|
| 缺必填输入 | 最多问一轮；否则标 assumption 并继续或停止 |
| 引用文件缺失 | 停止并报告路径 |

## 与其他 Skills 的关系

- 上游：  
- 下游：  

## 示例

见 [examples.md](references/examples.md)。
