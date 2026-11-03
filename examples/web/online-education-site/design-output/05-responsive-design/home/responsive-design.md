# Responsive Design — 首页 Home (`/`)

- Skill: web-responsive-design
- 日期: 2026-11-03
- 基准: `04-page-design/home/page-design.md`
- 置信度: medium
- Tokens: `breakpoint.*` · `layout.*` · `spacing.scale` · `typography.size`

## 1. Overview

**页面任务**：2 分钟理解教什么 → 分流产品线或申请试听。[FACT 自 Brief/Page Design]  
**响应式目标**：窄屏仍先见主张与双 CTA；产品线可扫完；申请触控可达。  
**继承**：Direction B 全宽英雄；不另建全局色板。  
**策略标签**：`marketing-stack` — 以首屏叠放与双列折一列为主，异于详情侧栏粘性与定价卡栈。

## 2. Viewport Strategy

| 视口带 | 建议测试宽 | 本页关注 |
|---|---|---|
| Narrow | 320 | 标题折行、CTA 全宽、无横溢 |
| Mobile | 375–639 | 汉堡 + 粘性申请；Hero 单列 |
| Tablet | 640–1023 | 产品线可试双列（md+） |
| Desktop | 1024–1279 | 完整 Primary Nav；Hero 可左右 |
| Wide | ≥1280 | 容器锁 1160；字号不无限放大 |

## 3. Breakpoint Rationale

| Token | 冲突→变化 |
|---|---|
| `lg` 1024 | Nav 项与「申请」并排拥挤 → **≥lg** 横排 Primary；**<lg** 汉堡，头栏保留申请或底粘性 |
| `md` 768 | 双产品线两卡并排过窄 → **≥md** 两列；**<md** 单列栈 |
| `sm` 640 | Hero 图文分栏字图打架 → **<sm～md** 统一叠放（本页以 `<lg` 叠放更稳）[HYPOTHESIS: 实现可在 md 试分栏] |
| `xl` 1280 | 宽屏留白失控 → 容器 `layout.container.max` 封顶 |

## 4. Layout Transformation

| 区域 | ≥lg | <lg | 原因 / UX |
|---|---|---|---|
| Hero | 左文右场景 | 上品牌文案→CTA→图 | 保证主张与 CTA 先于装饰图进入视线 |
| 产品线 | 两列等宽 | 单列，间距 32 | 避免半宽卡挤压「适合谁」文案 |
| 学习方式 / 教研 | 可两列或通栏 | 通栏 | 降低扫读负荷 |
| FAQ | 通栏 Accordion | 同左，触控行高加大 | 一致结构 |
| 终局 CTA | 居中带 | 全宽按钮 | 拇指区可达 |

**不变**：品牌名主导、主转化「申请试听」、双产品线都在首屏下方可及。

## 5. Content Priority

窄屏顺序：Header → Hero（主张+双 CTA）→ 产品线 → 如何学习 → 教研 → FAQ → 终局 CTA → Footer。  
**学员成果**：授权前不渲染（同 Page Design）；非「为移动端删决策信息」。  
FAQ 保持 3 问摘要，不藏主 CTA。  
P2「关于」仅 Footer，窄屏亦不提升到 Hero（避免干扰转化）。

## 6. Navigation Adaptation

- **≥lg**：Primary 横排；申请为头栏 primary 按钮。  
- **<lg**：汉堡打开全屏/抽层菜单；菜单内含课程体系/课程/团队/FAQ/申请；`aria-expanded`；Esc/遮罩关闭。[实现待测]  
- **粘性**：滚动后头栏可缩高；**<md` 可底栏「申请试听」**（与头栏二选一，避免双粘性打架）[HYPOTHESIS: 优先底栏]。  
- 当前页指示不单靠颜色。

## 7. Component Behavior

- **Button**：主 CTA 移动最小高度 44px；全宽可选于 Hero/终局。  
- **产品线块**：整卡可点；hover 仅桌面增强，移动靠清晰链文案。  
- **Accordion FAQ**：扩大点击热区；一次可多开或单开均可，需键盘可达。

## 8. Interaction Adaptation

- 不依赖 hover 显示产品线说明——说明默认可见。  
- Focus-visible 环保留（`border.focus`）。  
- 汉堡打开时焦点陷阱目标：**设计要求**；实测 NOT TESTED。  
- 主 CTA → `/apply`：成功/失败同 Page Design。

## 9. Typography & Spacing

| 元素 | ≥lg | <lg |
|---|---|---|
| Display / 品牌 | `size.2xl` | 降至 `xl`～`2xl` 间，避免两字爆行 |
| 正文 | `md` 16px | ≥`sm` 14px 硬底 |
| 区块间距 | 48/64 | 32/48 |
| Gutter | `layout.gutter.desktop` | `layout.gutter.mobile` 16px |

不新增全局 color tokens。

## 10. Responsive Media

Hero 图：桌面右栏固定比例（建议 4:3）；移动通栏，`object-fit: cover`，焦点偏学习场景主体，忌裁掉关键 UI。无图时用 `surface.muted` 占位，不裂图。

## 11. Accessibility

目标 WCAG 2.2 AA；**未跑对比度/读屏 → 不宣称认证**。  
触控目标、可见焦点、菜单语义、跳过链（实现期）列入待测。

## 12. Edge Cases

- 320：CTA 文案过长则允许两行，不缩小低于 14px。  
- 超长副题：限 3 行 + `…` 或编辑收紧（内容 TODO）。  
- 横屏手机：保持叠放，勿强行左右挤压。  
- 200% 缩放：容器流式；检查横溢 NOT TESTED。

## 13. Validation Checklist

| 项 | 状态 |
|---|---|
| 设计自检：顺序/断点理由/无 hover 依赖 | DONE（文档） |
| 375/768/1280 无横溢 | **NOT TESTED** |
| 汉堡键盘与焦点 | **NOT TESTED** |
| 主 CTA 触达 | **NOT TESTED**（设计已规定） |
| 伪造真机通过 | **禁止** |

## 14. FACT / HYPOTHESIS / TODO

- FACT：主转化申请；tokens 断点值；Direction 禁倒计时条。  
- HYPOTHESIS：底栏优于双粘性头；md 是否恢复 Hero 分栏。  
- TODO：实现后补浏览器矩阵；试听/咨询文案合并。
