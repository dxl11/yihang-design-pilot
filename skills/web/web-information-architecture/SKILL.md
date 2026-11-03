---
name: web-information-architecture
description: >-
  Builds website information architecture from a design brief and content clues:
  content inventory, task-based structure, sitemap, navigation, page relationships,
  and critical user paths. Use when designing site structure, menus, page maps,
  or user journeys for a marketing site or multi-page brochure site.
metadata:
  ydp.kind: atomic
  version: "0.1.0"
---

# Web Information Architecture

## 定位

基于 Design Brief 与内容材料，建立**任务导向**的网站信息架构（Sitemap、导航、页面关系、关键路径）。

本 Skill **不是**：视觉设计、组件库、SEO 全文策略、或用公司部门名硬套导航。

## 触发场景

- 「做网站结构 / sitemap / 导航 / 用户路径」。  
- Brief 已完成，进入结构阶段。  
- 改版前梳理页面重复与缺失。

## 不适用场景

- 单页落地且用户明确只要一页区块顺序（可用轻量页面大纲，不必完整 IA）。  
- 复杂 Web App 信息架构（权限、多角色工作台）——超出本营销站 Skill，应声明边界。

## 输入要求

| 输入 | 必填 | 说明 |
|---|---|---|
| `design-output/01-design-brief.md` 或等价 Brief | 强烈建议 | 缺失则先写假设 Brief 摘要再继续 |
| 内容/功能清单、现站、竞品结构 | 否 | 原始材料优先 |
| 已有页面列表 | 否 | |

无 Brief 时：在输出中设「Brief 假设」节，并列出信息缺口；**不假装**需求已确认。

## 任务理解（专业增量）

普通 AI：直接给「首页/关于/产品/博客/联系」。  
资深做法：

1. 先盘点内容与任务，再命名导航。  
2. 用主转化路径检验结构，而不是先画好看的树。  
3. 合并重复页，标出缺失页。  
4. 同时考虑桌面主导航与移动端折叠后的可达性。  
5. 检查死路与过深层级（营销站通常 ≤3 层点击到达关键转化）。

方法说明见 [methodology.md](references/methodology.md)。

## 执行流程

### Step 1 · 内容盘点

列出内容对象：产品、方案、定价、信任、支持、公司、法务等；标注来源与缺口。

### Step 2 · 内容分类

按**用户任务与语义**分类，避免「按内部部门」作为唯一轴。

### Step 3 · 用户任务分析

主/次任务、决策节点、任务完成定义（来自 Brief，缺则假设并标记）。

### Step 4 · 信息层级

L1 / L2 / L3；页面优先级（P0 转化相关 / P1 信任 / P2 辅助）。

### Step 5 · Sitemap

输出可读树 + 可选 Mermaid；每个节点一句职责。

### Step 6 · 导航模型

Primary / Secondary / Footer / Contextual；适用时 Breadcrumb。说明移动端如何收纳。

### Step 7 · 页面关系

入口、出口、关键内链、依赖（例：定价依赖方案页先理解差异）。

### Step 8 · 核心用户路径

≥1 条主路径（逐步页面）；可选 1 条替代路径。禁止机械套用与业务无关的漏斗。

### Step 9 · 可用性自检

重复页、缺失页、导航歧义、深藏 P0、死路、步骤过多。

### Step 10 · 落盘交付

## 工具调用

- 有浏览器：可核对现站 URL 结构；失败则记录。  
- 无 Card Sorting / Tree Testing 工具：用「任务-内容矩阵」纸面替代，**不伪造**测试统计。

## 输出要求

```text
design-output/02-information-architecture.md
```

必需章节见 [output-schema.md](references/output-schema.md)：

1. IA 目标  
2. 内容盘点  
3. 用户任务  
4. 内容分类  
5. Sitemap（树 + 可选图）  
6. 页面层级与优先级  
7. 导航结构  
8. 页面关系  
9. 核心用户路径  
10. 设计依据  
11. 风险与待确认  

## 质量检查（红线）

见 [quality-checklist.md](references/quality-checklist.md)。

- [ ] 结构服务 Brief 中的主任务与转化  
- [ ] Sitemap 节点均有职责一句  
- [ ] 主导航项 ≤ 合理数量（营销站常见 5–7，超额须论证）  
- [ ] 至少一条端到端主路径  
- [ ] 标明内容缺口  
- [ ] 可交接给视觉方向 / 设计系统 / 未来页面设计  

## 失败处理

| 情况 | 处理 |
|---|---|
| Brief 与内容清单冲突 | 列冲突，暂停定稿导航标签 |
| 用户坚持按部门导航且伤害任务 | 给风险说明 + 备选 IA，请确认 |
| 只要「加一个博客」无目标 | 标为 could，不默认提升为 L1 |

## 与其他 Skills

| 上游 | `web-design-brief` |
|---|---|
| 可并行 | `web-visual-direction`（结构与视觉可并行，改 IA 可能使方向样例页失效） |
| 下游 | `web-design-system`、未来 `web-page-design` |
| 编排 | `web-design-workflow` |

## 示例

见 [examples.md](references/examples.md)。
