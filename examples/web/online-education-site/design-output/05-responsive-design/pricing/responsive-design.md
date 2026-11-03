# Responsive Design — 价格与方案 Pricing (`/pricing`)

- Skill: web-responsive-design
- 日期: 2026-11-03
- 基准: `04-page-design/pricing/page-design.md`
- 置信度: low–medium（定价未定；IA 验证页）
- **禁止**：把口述金额写成页面 FACT 标价；浏览器结论未测不写通过。[FACT]

## 1. Overview

**页面任务**：理解方案维度差异 → 咨询报价或试听（非未确认闪购）。  
**响应式目标**：窄屏**仍能比较权益**；禁止「手机只留三个空价按钮」。  
**策略标签**：`compare-to-stack` — 多列比较 → 纵向方案卡；异于首页 Hero 叠放与详情阅读粘性。

## 2. Viewport Strategy

| 视口带 | 测试宽 | 关注 |
|---|---|---|
| Narrow/Mobile | 320–639 | 纵向方案卡；权益列表完整 |
| Tablet | 640–1023 | 可 2 列卡或保持纵栈 |
| Desktop | ≥1024 | 3 列骨架或表格式 |
| Wide | ≥1280 | 表/卡居中容器内 |

## 3. Breakpoint Rationale

| Token | 冲突→变化 |
|---|---|
| `lg` 1024 | 三列卡权益字号过小或横溢 → **≥lg** 三列或表；**<lg` 改为纵向卡栈（每卡含完整权益） |
| `md` 768 | 可选两列卡；若权益行过多仍纵栈更安全 [HYPOTHESIS: 默认 <lg 全纵栈] |
| `sm` 640 | 「价格确认中」提示条折行；CTA 全宽 |
| `xl` | 表格最大宽随 container，勿拉满 4K |

## 4. Layout Transformation

| 区域 | ≥lg | <lg | 原因 / UX |
|---|---|---|---|
| 方案比较 | 3 列等宽或矩阵表 | **每方案一张卡**，上到下栈叠 | 手机横滑表易丢列；纵卡保留决策维度 |
| 表头「方案名」 | 列头固定 | 成为卡标题 | 语境不丢 |
| 价格格 | 「获取报价」按钮 | 同，全宽 | 无 ¥ 数字 FACT |
| 如何选择 | 三步横排可 | 三步竖排 | 降低误读 |
| 终局 CTA | 双钮并排 | 主次垂直全宽 | 触控 |

**明确禁止**：移动端隐藏「含什么/不含什么」或权益行以「省空间」。[FACT 设计决策]

## 5. Content Priority

顺序：诚实状态提示 → 方案卡（入门/系统/进阶 PLACEHOLDER）→ 如何选择 → 边界 → FAQ → 双 CTA。  
政策无文案则整块不渲染（同 Page Design），非移动特供删除。  
提示「价格确认中」在所有视口首屏可见。

## 6. Navigation Adaptation

- 若导航暂不展示本页（IA TODO）：深链仍可用本规格。  
- 有入口时：全局汉堡规则同首页；当前页指示。  
- 页内无依赖 hover 的「悬停看权益」——权益默认展开于卡内。

## 7. Component Behavior

- **Pricing card**：标题、权益 ul、主 CTA「咨询适合我的方案」、次链试听。  
- **强调中档**：边框 `border.strong` + `brandSubtle`；窄屏用「推荐」文本而非荧光角标（无销量 FACT）。  
- **FAQ Accordion**：同全站。  
- 若桌面用 `<table>`：`<lg` **改卡**，不横滑遮罩敷衍（横滑可作为渐进增强但不是唯一路径）。[INFER]

## 8. Interaction Adaptation

- 主 CTA → `/apply?intent=pricing&plan=`；成功/失败同 Page Design。  
- 无 hover 才显示权益。  
- 卡片不强制手势翻页轮播（易漏比较）。

## 9. Typography & Spacing

- H1 中性「学习方案与投入」；移动 `xl`→`lg`。  
- 权益项 `sm`/`md`，行距 relaxed。  
- 卡间距 24；容器 gutter mobile 16。  
- 继承 tokens；警告条用 `status.warning` 文本，非新色板。

## 10. Responsive Media

本页少图；图标随卡，不裁切关键对比符号。无人物证言图需求。

## 11. Accessibility

比较卡标题层级：每卡一个 `h2`/`h3`；列表语义。  
表改卡后读屏应能按方案浏览。  
目标 AA；**NOT TESTED**。

## 12. Edge Cases

- 三档变为两档：布局仍纵栈/自动少列。  
- 权益文案极长：卡内换行，不缩小至 <12px。  
- 320：双 CTA 垂直；提示条不溢出。  
- 放大 200%：卡栈流式；检查重叠 NOT TESTED。

## 13. Validation Checklist

| 项 | 状态 |
|---|---|
| 设计：纵卡保留权益 | DONE |
| 无 FACT 标价数字展示 | DONE（规格约束） |
| 375/1024 比较可读 | **NOT TESTED** |
| 申请 intentional 参数 | **NOT TESTED** |

## 14. FACT / HYPOTHESIS / TODO

- FACT：验证页；咨询导向；不输出 FACT 标价。  
- HYPOTHESIS：`<lg` 默认全纵栈优于 md 双列。  
- TODO：正式权益维度；是否进导航；真浏览器矩阵。
