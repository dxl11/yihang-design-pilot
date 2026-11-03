---
name: web-visual-direction
description: >-
  Defines website visual direction including visual strategy, color system,
  typography, layout skeleton, imagery language, and anti-patterns. Use when
  exploring art direction for marketing sites or landing pages before UI
  production, or when the user asks for visual directions, moodboards-as-spec,
  or competing design directions for web.
metadata:
  ydp.kind: atomic
  version: "0.1.0"
---

# Web Visual Direction

## 定位

为本网站（营销站 / 落地页 / 品牌官网首屏体系）产出**可执行的视觉方向规范**，供后续页面设计遵守。

本 Skill **不**负责：信息架构全文、组件库实现、全站所有页面 HTML、部署或 SEO 工程。

## 触发场景

- 用户要「几个视觉方向」「艺术方向」「先定风格再做页面」。  
- 已有简报或 IA，进入视觉探索。  
- 品牌色已知，但需要网页语境下的布局与材质策略。

## 不适用场景

- 只要改一句文案或修一个 bug。  
- 生产级 Web App 后台（复杂数据产品请用专门产品设计流程）。  
- 用户只要 PPT / 海报（改用 presentation 或后续品类 Skill）。

## 输入要求

| 输入 | 必填 | 说明 |
|---|---|---|
| `design-output/01-design-brief.md`（或等价 Brief） | 强烈建议 | 有则优先；无则用下表字段现场收集 |
| `design-output/02-information-architecture.md` | 否 | 有助于定「样例页」类型，可与 IA 并行 |
| 站点目标与受众 | 是（无 Brief 时） | 一句话目标 + 主受众 |
| 核心信息 / 差异点 | 是（无 Brief 时） | 用户应记住什么 |
| 页面类型 | 是 | 落地页 / 官网 / 文档站营销层等 |
| 品牌资产 | 否 | logo、色、字体、UI 截图；有则强制遵守 |
| 参考站点 | 否 | URL 或截图；须注明「借版式还是借气质」 |
| 硬约束 | 否 | 必须浅色、无衬线、无库存图等 |

缺必填时：最多问 **一轮**（≤3 问）。无回复则写 `assumptions` 后继续。

## 任务理解

1. 用自己的话重述：商业目标、受众情境、情绪基调、成功长什么样。  
2. 区分「品牌约束」与「题材气质」：有品牌时，三方向是**同一品牌下的三种诠释**，不是三套无关皮肤。  
3. 定输出尺寸语境：桌面首屏为主（默认 1440 宽思考），并声明移动端如何继承骨架。

## 执行流程

1. **读入**：优先读 `design-output/01-design-brief.md`；若存在 IA / `brand-profile.md` / `brand-spec.md` 则一并读。  
2. **禁止事项清单**：写出本次明确不做的 AI 默认套路（见 [design-rules.md](references/design-rules.md)）。  
3. **提案 3 个方向**（必须骨架不同，禁止只换色）：  
   - 每个方向按 [methodology.md](references/methodology.md) 填完整字段。  
   - 三方向温度尽量分散（如大胆 / 中性 / 克制），允许用户品牌限制下的收缩。  
4. **可见化**：每个方向至少产出一帧「关键首屏结构」说明（可用线框级 HTML 或结构图 + 色板条）。不要只给形容词。  
5. **停下等待选择**：写入 `visual-directions.md`，展示后结束回合（除非用户已指定唯一方向或明示跳过）。  
6. **固化批准**：用户选定后写 `visual-direction.md`（单方向执行稿）+ `direction-approved.md`（含用户原话）。

## 工具调用

- 规则细则：[methodology.md](references/methodology.md)、[design-rules.md](references/design-rules.md)  
- 示例：[examples.md](references/examples.md)  
- 可选知识库：`knowledge/design-styles/`（P1 可能仍为空，缺省时勿伪造「已迁移风格 ID」）  
- 上游：`web-design-brief`（available）、`web-information-architecture`（available，可并行）  
- 下游：`web-design-system`（available）、未来 `web-page-design`（planned）  
- 品牌类 Skills：仍为 planned  

## 输出要求

在**用户项目目录**写入（不要写入本 skill 仓库）。默认推荐：

```text
design-output/visual-directions.md
design-output/visual-direction.md          # 选定后
design-output/direction-approved.md        # 选定后
```

兼容旧路径：项目根下同名文件亦可；新项目优先 `design-output/`。

### `visual-directions.md`

三个方向，每个包含：

| 字段 | 要求 |
|---|---|
| ID | `D1` / `D2` / `D3` |
| 一句话定位 | 策略，不是「现代简约」空词 |
| 策略逻辑 | 为何适合该受众/题材 |
| 色彩 | 2–3 有彩色 + 中性阶；写来源（品牌/题材/采样）与 oklch 或 hex |
| 字体 | display + body；中文场景注明中文字体策略 |
| 布局骨架 | 一句话 + 关键分区（首屏必须） |
| 图像/材质语言 | 真图 / 程序化 / 大字体主导等 |
| 装饰与动效态度 | 克制等级 |
| 禁止 | 本方向明确不做的手法 |
| 风险 | 可能过时/难落地之处 |

### `visual-direction.md`（选定后）

上述单方向完整稿 + 「给页面设计的硬约束」十条以内。

### `direction-approved.md`（选定后）

- 选中 ID  
- 用户原话  
- 日期  

## 质量检查（红线）

- [ ] 三方向布局骨架可被第三方区分（不是同一栅格换色）  
- [ ] 每个方向色板有来源论证一句  
- [ ] 有品牌资产时未擅自改 logo 几何或发明假标志  
- [ ] 未使用「高级感/国际范」替代具体参数  
- [ ] 展示后等待确认（或已记录跳过理由）  
- [ ] 批准文件含用户原话  

## 失败处理

| 情况 | 处理 |
|---|---|
| 无目标无受众 | 追问一轮；仍无则 assumption 并标注置信度低 |
| 品牌资产下载失败 | 停止假装有 logo；列出缺失项请用户提供 |
| 用户要「融合三个方向」 | 允许合成，但必须重写一份统一骨架，禁止拼接撞车 |
| 只要一个方向 | 仍建议快速给 2 个轻量备选；用户拒绝则记录后单方向深化 |

## 示例

见 [examples.md](references/examples.md)。
